import { authService } from "@/services/authService";
import { useChat } from "./useChat";
import { toast } from "sonner";
import { clearState, setAuth, setLoading } from "@/lib/features/authSlice";
import { useAppDispatch } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { clearChat } from "@/lib/features/chatSlice";

export const useAuth = () => {
  const { fetchConversations } = useChat();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const SignUp = async (username: string, email: string, password: string) => {
    try {
      await authService.signUp(username, email, password);

      toast.success("Đăng ký thành công");
      router.push("/login");
    } catch (error) {
      console.log("Lỗi khi đăng ký", error);
      toast.error("Đã xảy ra lỗi. Hãy thử lại");
    }
  };

  const SignIn = async (email: string, password: string) => {
    try {
      localStorage.clear();

      dispatch(setLoading(true));

      const { accessToken, user } = await authService.signIn(email, password);

      toast.success("Dang nhap thanh cong");

      dispatch(setAuth({ token: accessToken, user }));
      await fetchConversations();

      router.push("/");
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message ?? "Đã xảy ra lỗi. Hãy thử lại!");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const SignOut = async () => {
    try {
      await authService.signOut();

      toast.info("Dang xuat thanh cong");

      dispatch(clearState());
      localStorage.clear();

      router.replace("/login");

      dispatch(clearChat());
    } catch (error: any) {
      toast.error(error?.message ?? "Da xay ra loi. Hay thu lai!");
      console.error(error.message);
    }
  };

  return { SignUp, SignIn, SignOut };
};
