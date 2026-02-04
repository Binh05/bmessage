import { RootState } from "./store";

export const authSelector = (state: RootState) => state.auth;
export const chatSelector = (state: RootState) => state.chat;
