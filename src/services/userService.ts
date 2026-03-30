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

const updateProfile = async (phone?: string, bio?: string) => {
  const updateData: { phone?: string; bio?: string } = {};
  if (phone !== undefined) updateData.phone = phone;
  if (bio !== undefined) updateData.bio = bio;

  const res = await api.patch("/user/update", updateData);

  return res.data.data;
};

export const userService = {
  searchUser,
  fetchMe,
  uploadAvatar,
  updateProfile,
};
