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
    addFriend: (state, action: PayloadAction<Friend>) => {
      state.friends.push(action.payload);
    },
    removeFriend: (state, action: PayloadAction<string>) => {
      state.friends = state.friends.filter((f) => f._id != action.payload);
    },
    setReceived: (state, action: PayloadAction<FriendRequest[]>) => {
      state.receivedList = action.payload;
    },
    addReceived: (state, action: PayloadAction<FriendRequest>) => {
      state.receivedList.push(action.payload);
    },
    removeReceived: (state, action: PayloadAction<FriendRequest>) => {
      state.receivedList = state.receivedList.filter(
        (r) => r.from?._id != action.payload._id,
      );
    },
    setSent: (state, action: PayloadAction<FriendRequest[]>) => {
      state.sentList = action.payload;
    },
    addSent: (state, action: PayloadAction<FriendRequest>) => {
      state.sentList.push(action.payload);
    },
    removeSent: (state, action: PayloadAction<FriendRequest>) => {
      state.sentList = state.sentList.filter(
        (s) => s.to?._id != action.payload._id,
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
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

export const {
  setFriends,
  addFriend,
  removeFriend,
  setReceived,
  addReceived,
  removeReceived,
  setSent,
  addSent,
  removeSent,
  setLoading,
} = friendSlice.actions;
export const friend = friendSlice.reducer;
