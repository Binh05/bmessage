import {
  addFriend,
  addSent,
  removeFriend,
  removeReceived,
  removeSent,
  setFriends,
  setLoading,
  setReceived,
  setSent,
} from "@/lib/features/friendSlide";
import { useAppDispatch } from "@/lib/hooks";
import { friendService } from "@/services/friendService";
import { toast } from "sonner";

export const useFriend = () => {
  const dispatch = useAppDispatch();

  const sendFriendRequest = async (friendId: string) => {
    try {
      const data = await friendService.sendFriendRequest(friendId);

      console.log("sent friend request", data);

      dispatch(addSent(data.request));
      toast.success("Đã gửi lời mời kết bạn");
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
    } catch (error) {
      console.error("Loi khi lay danh sach friend request", error);
    }
  };

  const cancelFriendRequest = async (requestId: string) => {
    try {
      dispatch(setLoading(true));
      const data = await friendService.cancelFriendRequest(requestId);

      dispatch(removeSent(data.friendCancel));

      console.log(data);

      toast.success("Thu hồi lời mời kết bạn thành công");
    } catch (error) {
      console.error("Lỗi khi thu hồi lời mời kết bạn", error);
      toast.error("Lỗi khi thu hồi lời mời kết bạn. Hãy thử lại!");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const acceptFriendRequest = async (requestId: string) => {
    try {
      dispatch(setLoading(true));
      const data = await friendService.acceptFriendRequest(requestId);

      console.log("accept", data);

      dispatch(removeReceived(data.newFriend));
      dispatch(addFriend(data.newFriend));
      toast.success("Đã trở thành bạn bè. Hãy bắt đầu các cuộc trò chuyện");
    } catch (error) {
      console.error("Lỗi khi accept friend request", error);
      toast.error("Lỗi khi đồng ý lời mời kết bạn. Hãy thử lại!");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const declineFriendRequest = async (requestId: string) => {
    try {
      dispatch(setLoading(true));
      const data = await friendService.declineFriendRequest(requestId);

      console.log("decline", data);

      dispatch(removeReceived(data.FriendDecline));
      toast.success("Đã từ chối lời mời kết bạn");
    } catch (error) {
      console.error("Lỗi khi từ chối lời mời kết bạn");
      toast.error("Đẫ xảy ra lỗi. Hãy thử lại!");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const getFriends = async () => {
    try {
      const data = await friendService.getFriends();

      dispatch(setFriends(data.friends));
    } catch (error) {
      console.error("Lỗi load danh sách bạn bè", error);
    }
  };

  const unfriend = async (friendId: string) => {
    try {
      const { message, friendshipsId } = await friendService.unfriend(friendId);

      dispatch(removeFriend(friendshipsId));
      toast.success(message);
    } catch (error) {
      console.error("Lỗi khi hủy kết bạn", error);
      toast.error("Lỗi khi hủy kết bạn");
    }
  };

  return {
    sendFriendRequest,
    getFriendRequest,
    cancelFriendRequest,
    acceptFriendRequest,
    declineFriendRequest,
    getFriends,
    unfriend,
  };
};
