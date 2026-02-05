import { io, Socket } from "socket.io-client";
import { urlBase } from "@/utils/api";

export let socket: Socket | null = null;

export const initSocket = (token: string) => {
  if (socket) return socket;

  const URL_BASE = process.env.NEXT_PUBLIC_SOCKET_URL ?? urlBase;

  socket = io(URL_BASE, {
    auth: { token },
    transports: ["websocket"],
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => socket;
