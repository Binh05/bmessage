import { FriendState } from "@/types/store";
import { Friend, FriendRequest } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: FriendState = {
  loading: false,
  friends: [],
  receivedList: [],
  sentList: [],
};

const friendSlice = createSlice({
  name: "friend",
  initialState,
  reducers: {
    setFriends: (state, action: PayloadAction<Friend[]>) => {
      state.friends = action.payload;
    },
    setReceived: (state, action: PayloadAction<FriendRequest[]>) => {
      state.receivedList = action.payload;
    },
    setSent: (state, action: PayloadAction<FriendRequest[]>) => {
      state.sentList = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    resetFriendState: (state) => {
      state.loading = false;
      state.friends = [];
      state.receivedList = [];
      state.sentList = [];
    },
  },
});

export const { setFriends, setReceived, setSent, setLoading } =
  friendSlice.actions;
export const friend = friendSlice.reducer;
