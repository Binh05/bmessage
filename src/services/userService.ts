import { api } from "@/lib/api";

const searchUser = async (email: string) => {
  const res = await api.get(`/user?email=${email}`);

  return res.data;
};

const fetchMe = async () => {
  const res = await api.get("/user/me");

  return res.data.user;
};

export const userService = {
  searchUser,
  fetchMe,
};
