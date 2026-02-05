import { RootState } from "./store";

export const authSelector = (state: RootState) => state.auth;
export const chatSelector = (state: RootState) => state.chat;
export const socketSelector = (state: RootState) => state.socket;
