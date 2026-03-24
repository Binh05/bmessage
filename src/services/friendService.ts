import { api } from "@/lib/api";

const sendFriendRequest = async (friendId: string) => {
  const res = await api.post("/friends/requests", { to: friendId });

  return res.data;
};

export const friendService = { sendFriendRequest };
