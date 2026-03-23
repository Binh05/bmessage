import { api } from "@/lib/api";

export const authService = {
  signOut: async () => {
    await api.post("/auth/signout");
  },

  signIn: async (email: string, password: string) => {
    const res = await api.post(`/auth/signin`, { email, password })

    console.log(res.data)
    return res.data;
  },

  signUp: async (username: string, email: string, password: string) => {
    const res = await api.post("/auth/signout", {
      username, email, password
    })

    return res.data
  }
};
