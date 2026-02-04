import React from "react";
import { SidebarInset } from "../ui/sidebar";
import ChatWindowHeader from "./ChatWindowHeader";

const ChatWelcomeScreen = () => {
  return (
    <SidebarInset className="h-full w-full bg-transparent p-2">
      <ChatWindowHeader />
      <div className="bg-primary-foreground flex flex-1 items-center justify-center rounded-2xl">
        <div className="text-center">
          <div className="pulse-ring bg-gradient-chat shadow-glow mx-auto mb-6 flex size-24 items-center justify-center rounded-full">
            <span className="text-3xl">💬</span>
          </div>
          <h2 className="bg-gradient-chat mb-2 bg-clip-text text-2xl font-bold text-transparent">
            Chào mừng bạn đến với BMessage
          </h2>
          <p className="text-muted-foreground">
            Hãy chọn một cuộc hội thoại để bắt đầu trò chuyện
          </p>
        </div>
      </div>
    </SidebarInset>
  );
};

export default ChatWelcomeScreen;
