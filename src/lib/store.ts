import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./features/authSlice";
import { chatReducer } from "./features/chatSlice";
import storage from "redux-persist/lib/storage";
import { createTransform, persistReducer } from "redux-persist";
import { initialState as iStateChat } from "./features/chatSlice";

const chatTransform = createTransform(
  (inboundState: any) => {
    return {
      conversations: inboundState.conversations,
    };
  },
  (outboundState: any) => {
    return {
      ...iStateChat,
      conversations: outboundState.conversations ?? [],
    };
  },
  { whitelist: ["chat"] },
);

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "chat"],
  transforms: [chatTransform],
};

const rootReducer = combineReducers({
  auth: authReducer,
  chat: chatReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
//export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
