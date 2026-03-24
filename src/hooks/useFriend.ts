import { setReceived, setSent } from "@/lib/features/friendSlide";
import { useAppDispatch } from "@/lib/hooks";
import { friendService } from "@/services/friendService";
import { toast } from "sonner";

export const useFriend = () => {
  const dispatch = useAppDispatch();

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

  const getFriendRequest = async () => {
    try {
      const data = await friendService.getFriendRequest();

      dispatch(setSent(data.sent));
      dispatch(setReceived(data.received));
      console.log(data);
    } catch (error) {
      console.error("Loi khi lay danh sach friend request", error);
    }
  };

  return { sendFriendRequest, getFriendRequest };
};
