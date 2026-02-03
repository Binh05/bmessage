import { authService } from "@/services/authService";
import { useChat } from "./useChat";
import { toast } from "sonner";
import { clearState, setAuth } from "@/lib/features/authSlice";
import { useAppDispatch } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { clearChat } from "@/lib/features/chatSlice";

export const useAuth = () => {
  const { fetchConversations } = useChat();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const SignIn = async (email: string, password: string) => {
    try {
      localStorage.clear();

      const { token, user } = await authService.signIn(email, password);

      toast.success("Dang nhap thanh cong");

      dispatch(setAuth({ token, user }));
      await fetchConversations(token);

      router.push("/");
    } catch (error: any) {
      toast.error(error?.message ?? "Đã xảy ra lỗi. Hãy thử lại!");
    }
  };

  const SignOut = async () => {
    try {
      await authService.signOut();

      toast.info("Dang xuat thanh cong");
      router.replace("/login");

      dispatch(clearState());
      dispatch(clearChat());

      localStorage.clear();
    } catch (error: any) {
      toast.error(error?.message ?? "Da xay ra loi. Hay thu lai!");
      console.error(error.message);
    }
  };

  return { SignIn, SignOut };
};
