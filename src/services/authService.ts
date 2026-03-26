import { api } from "@/lib/api";

export const authService = {
  signOut: async () => {
    // await api.post("/auth/signout");
    const res = await fetch("/api-proxy/auth/signout", {
      method: "POST",
      credentials: "include",
    });

    if (res.status != 204) {
      throw new Error("Lỗi khi đăng xuất");
    }
  },

  signIn: async (email: string, password: string) => {
    //const res = await api.post(`/auth/signin`, { email, password });
    const res = await fetch("/api-proxy/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error("Loi khi dang nhap");
    }

    console.log("signin data", data);

    return data;
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
