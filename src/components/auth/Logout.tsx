"use client";
import { signOut } from "@/services/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks";
import { clearState } from "@/lib/features/authSlice";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { clearChat } from "@/lib/features/chatSlice";

const Logout = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const onLogout = async () => {
    try {
      await signOut();

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

  return (
    <Button onClick={onLogout} variant={"completeGhost"}>
      <LogOut className="text-destructive" />
      Log out
    </Button>
  );
};

export default Logout;
