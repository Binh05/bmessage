"use client";

import ChatWindowLayout from "@/components/chat/ChatWindowLayout";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useUser } from "@/hooks/useUser";
import { useEffect } from "react";

export default function Page() {
  const { fetchMe } = useUser();

  useEffect(() => {
    fetchMe();
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex h-screen w-full p-2">
        <ChatWindowLayout />
      </div>
    </SidebarProvider>
  );
}
