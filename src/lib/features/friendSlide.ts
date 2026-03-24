import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  friend: [],
};

const friendSlice = createSlice({
  name: "friend",
  initialState,
  reducers: {},
});
