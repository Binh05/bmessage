import { User } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Auth {
  token: string | null;
  user: User | null;
}

const initialState: Auth = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (
      state: Auth,
      action: PayloadAction<{ token: string; user: User }>,
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    clearState: () => ({
      token: null,
      user: null,
    }),
  },
});

export const authReducer = authSlice.reducer;
export const { setAuth, clearState } = authSlice.actions;
