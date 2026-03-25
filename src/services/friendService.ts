import { api } from "@/lib/api";

const sendFriendRequest = async (friendId: string) => {
  const res = await api.post("/friends/requests", { to: friendId });

  return res.data;
};

const getFriendRequest = async () => {
  const res = await api.get("/friends/requests");

  return res.data;
};

const cancelFriendRequest = async (requestId: string) => {
  const res = await api.post(`/friends/requests/${requestId}/cancel`);

  return res.data;
};

const acceptFriendRequest = async (requestId: string) => {
  const res = await api.post(`/friends/requests/${requestId}/accept`);

  return res.data;
};

const declineFriendRequest = async (requestId: string) => {
  const res = await api.post(`/friends/requests/${requestId}/decline`);

  return res.data;
};

export const friendService = {
  sendFriendRequest,
  getFriendRequest,
  cancelFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
};
