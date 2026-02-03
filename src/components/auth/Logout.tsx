"use client";

import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Logout = () => {
  const { SignOut } = useAuth();

  const onLogout = async () => {
    await SignOut();
  };

  return (
    <Button onClick={onLogout} variant={"completeGhost"}>
      <LogOut className="text-destructive" />
      Log out
    </Button>
  );
};

export default Logout;
