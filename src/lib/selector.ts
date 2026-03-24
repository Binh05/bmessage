import { RootState } from "./store";

export const authSelector = (state: RootState) => state.auth;
export const chatSelector = (state: RootState) => state.chat;
export const socketSelector = (state: RootState) => state.socket;
export const themeSelector = (state: RootState) => state.theme;
export const friendSelector = (state: RootState) => state.friend;
