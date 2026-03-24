import { friendService } from "@/services/friendService";
import { toast } from "sonner";

export const useFriend = () => {
  const sendFriendRequest = async (friendId: string) => {
    try {
      const req = await friendService.sendFriendRequest(friendId);

      toast.success("Đã gửi lời mời kết bạn");
      console.log("send friend request", req);
    } catch (error) {
      console.error("Loi khi send friend request", error);
      toast.error("Gửi thất bại. Hãy thử lại");
    }
  };

  return sendFriendRequest;
};
