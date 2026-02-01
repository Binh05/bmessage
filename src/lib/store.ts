import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./features/authSlice";
import { chatReducer } from "./features/chatSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            authReducer,
            chatReducer,
        },
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
