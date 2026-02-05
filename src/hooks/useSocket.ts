import { clearSocket, setSocket } from "@/lib/features/socketSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { authSelector, socketSelector } from "@/lib/selector";
import { urlBase } from "@/utils/api";
import { io, Socket } from "socket.io-client";

const URL_BASE = process.env.NEXT_PUBLIC_API_BASE ?? urlBase;

export const useSocket = () => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector(authSelector);
  const { socket: existingSocket } = useAppSelector(socketSelector);

  const connectSocket = () => {
    if (existingSocket) return;

    const socket: Socket = io(URL_BASE, {
      auth: { token },
      transports: ["websocket"],
    });

    dispatch(setSocket(socket));

    socket.on("connect", () => {
      console.log("Da ket noi voi socket");
    });
  };

  const disconnectSocket = () => {
    if (existingSocket) {
      existingSocket.disconnect();
      dispatch(clearSocket());
    }
  };

  return { connectSocket, disconnectSocket };
};
