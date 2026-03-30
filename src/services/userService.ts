import { api } from "@/lib/api";

const searchUser = async (email: string) => {
  const res = await api.get(`/user?email=${email}`);

  return res.data;
};

const fetchMe = async () => {
  const res = await api.get("/user/me");

  return res.data.user;
};

const uploadAvatar = async (fromData: FormData) => {
  const res = await api.post("/user/uploadAvatar", fromData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  if (res.status == 400) {
    throw new Error(res.data.message);
  }

  return res.data;
};

export const userService = {
  searchUser,
  fetchMe,
  uploadAvatar,
};
