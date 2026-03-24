import { api } from "@/lib/api";

const searchUser = async (username: string) => {
  const res = await api.get(`/user?username=${username}`);

  return res.data;
};

export const userService = {
  searchUser,
};
