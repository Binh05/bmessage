import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SocketState {
  onlineUsers: string[];
}

const initialState: SocketState = {
  onlineUsers: [],
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setOnlineUsers: (state, action: PayloadAction<string[]>) => {
      state.onlineUsers = action.payload;
    },
    resetSocket: (state) => {
      state.onlineUsers = [];
    },
  },
});

export const { setOnlineUsers, resetSocket } = socketSlice.actions;
export const socketReducer = socketSlice.reducer;
