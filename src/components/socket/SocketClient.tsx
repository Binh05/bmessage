"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { authSelector } from "@/lib/selector";
import { initSocket, disconnectSocket, getSocket } from "@/lib/socket";
import { setOnlineUsers } from "@/lib/features/socketSlice";

export default function SocketClient() {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector(authSelector);

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

    socketInstance.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    // Cleanup khi unmount hoặc token thay đổi
    return () => {
      // disconnect khi logout (token mất)
      if (!token) disconnectSocket();

      // Xóa listeners để tránh duplicate
      socketInstance.off("connect");
      socketInstance.off("disconnect");
    };
  }, [token, dispatch]);

  return null;
}
