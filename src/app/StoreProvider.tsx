"use client";

import { injectStore } from "@/lib/api";
import { AppStore, makeStore } from "@/lib/store";
import { useRef } from "react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import ThemeHandler from "./ThemeHandler";

function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore>(undefined);
  const persistRef = useRef<any>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
    persistRef.current = persistStore(storeRef.current);

    injectStore(storeRef.current)
  }

  return (
    <Provider store={storeRef.current} >
      <PersistGate loading={null} persistor={persistRef.current}>
        <ThemeHandler />
        {children}
      </PersistGate>
    </Provider>
  );
}

export default StoreProvider;
