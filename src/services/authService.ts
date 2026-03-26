import { api } from "@/lib/api";

export const authService = {
  signOut: async () => {
    await api.post("/auth/signout");
  },

  signIn: async (email: string, password: string) => {
    console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
    const res = await api.post(`/auth/signin`, { email, password });

    return res.data;
  },

  signUp: async (username: string, email: string, password: string) => {
    const res = await api.post("/auth/signout", {
      username,
      email,
      password,
    });

    return res.data;
  },
};
