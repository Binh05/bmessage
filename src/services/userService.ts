import { api } from "@/lib/api";

const searchUser = async (email: string) => {
  const res = await api.get(`/user?email=${email}`);

  return res.data;
};

export const userService = {
  searchUser,
};
