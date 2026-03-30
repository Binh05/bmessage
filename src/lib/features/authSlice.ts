import { User } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";

interface Auth {
  token: string | null;
  user: User | null;
  loading: boolean;
}

const initialState: Auth = {
  token: null,
  user: null,
  loading: false,
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
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setAvatar: (state, action: PayloadAction<string>) => {
      if (!state.user) return;

      state.user.avatarUrl = action.payload;
    },
    clearState: () => ({
      token: null,
      user: null,
      loading: false,
    }),
  },
});

export const authReducer = authSlice.reducer;
export const { setAuth, setUser, setToken, setLoading, setAvatar, clearState } =
  authSlice.actions;
