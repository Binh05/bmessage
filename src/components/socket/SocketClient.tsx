"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { authSelector, chatSelector } from "@/lib/selector";
import { initSocket, disconnectSocket, getSocket } from "@/lib/socket";
import { setOnlineUsers } from "@/lib/features/socketSlice";
import { useChat } from "@/hooks/useChat";
import { updateConversation } from "@/lib/features/chatSlice";

export default function SocketClient() {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector(authSelector);
  const { addMessage } = useChat();

  useEffect(() => {
    if (!token) {
      disconnectSocket();
      return;
    }

    const socketInstance = initSocket(token);

    socketInstance.on("connect", () => {
      console.log("Socket connected:", socketInstance.id);
    });

    socketInstance.on("online-users", (userIds) => {
      dispatch(setOnlineUsers(userIds));
    });

    socketInstance.on(
      "new-message",
      ({ message, conversation, unreadCounts }) => {
        addMessage(message);

        const lastMessage = {
          _id: conversation.lastMessage._id,
          content: conversation.lastMessage.content,
          createdAt: conversation.lastMessage.createdAt,
          sender: {
            _id: conversation.lastMessage.senderId,
            displayName: "",
            avatarUrl: null,
          },
        };

        const updatedConversation = {
          ...conversation,
          lastMessage,
          unreadCounts,
        };

        // mark ass seen

        dispatch(updateConversation(updatedConversation));
      },
    );

    socketInstance.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    // Cleanup khi unmount hoặc token thay đổi
    return () => {
      // disconnect khi logout (token mất)
      if (!token) disconnectSocket();

      // Xóa listeners để tránh duplicate
      socketInstance.off("connect");
      socketInstance.off("online-users");
      socketInstance.off("new-message");
      socketInstance.off("disconnect");
    };
  }, [token, dispatch]);

  return null;
}
