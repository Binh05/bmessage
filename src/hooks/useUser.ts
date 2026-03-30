import { setAvatar, setUser } from "@/lib/features/authSlice";
import { useAppDispatch } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { userService } from "@/services/userService";
import { useStore } from "react-redux";
import { toast } from "sonner";

export const useUser = () => {
  const dispatch = useAppDispatch();
  const store = useStore<RootState>();

  const fetchMe = async () => {
    try {
      const user = await userService.fetchMe();

      dispatch(setUser(user));
    } catch (error) {
      console.log("Lỗi khi fetch me", error);
    }
  };

  const searchUser = async (email: string) => {
    try {
      const data = await userService.searchUser(email);

      console.log("search user data", data);
      return data;
    } catch (error) {
      console.error("Loi khi search user", error);
    }
  };

  const uploadAvatar = async (formData: FormData) => {
    try {
      const { user } = store.getState().auth;
      if (!user) return;

      const { avatarUrl } = await userService.uploadAvatar(formData);

      dispatch(setAvatar(avatarUrl));
      toast.success("Đổi ảnh đại diện thành công");
    } catch (error) {
      console.error("Lỗi khi upload avatar", error);
      toast.error("Không thể upload avatar");
    }
  };

  return {
    fetchMe,
    searchUser,
    uploadAvatar,
  };
};
