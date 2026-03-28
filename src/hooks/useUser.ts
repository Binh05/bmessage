import { setUser } from "@/lib/features/authSlice";
import { useAppDispatch } from "@/lib/hooks";
import { userService } from "@/services/userService";

export const useUser = () => {
  const dispatch = useAppDispatch();

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

  return {
    fetchMe,
    searchUser,
  };
};
