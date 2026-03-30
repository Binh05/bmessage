import { api } from "@/lib/api";

export const authService = {
  signOut: async () => {
    await api.post("/auth/signout");
  },

  signIn: async (email: string, password: string) => {
    const res = await api.post(`/auth/signin`, { email, password });

    return res.data;
  },

  signUp: async (username: string, email: string, password: string) => {
    await api.post("/auth/signup", {
      username,
      email,
      password,
    });
  },
};
