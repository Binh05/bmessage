import {
  addMessageRealtime,
  resetSeenBy,
  setConversations,
  setConvoLoading,
  setMessageLoading,
  setMessages,
} from "@/lib/features/chatSlice";
import { useAppDispatch } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { chatService } from "@/services/chatService";
import { Message } from "@/types/chat";
import { useStore } from "react-redux";

export const useChat = () => {
  const dispatch = useAppDispatch();
  const store = useStore<RootState>();

  const fetchConversations = async (token: string) => {
    try {
      dispatch(setConvoLoading(true));

      if (!token) throw new Error("Ban khong co quyen");
      const data = await chatService.fetchConversation(token);

      dispatch(setConversations(data.conversations));
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setConvoLoading(false));
    }
  };

  const fetchMessages = async (conversationId?: string) => {
    const state = store.getState();
    const { activeConversationId, messages } = state.chat;
    const { token, user } = state.auth;

    const convoId = conversationId ?? activeConversationId;

    console.log(convoId);
    console.log(activeConversationId);

    if (!convoId) return;

    const current = messages?.[convoId];
    const nextCursor =
      current?.nextCursor === undefined ? "" : current?.nextCursor;

    if (nextCursor === null) return;

    dispatch(setMessageLoading(true));

    try {
      if (!token) throw new Error("Bạn không có quyền");

      const { messages: fetched, cursor } = await chatService.fetchMessages(
        token,
        convoId,
        nextCursor,
      );

      const processed = fetched.map((m) => ({
        ...m,
        isOwn: m.senderId === user?._id,
      }));

      dispatch(
        setMessages({ messages: processed, convoId, nextCursor: cursor }),
      );
    } catch (error) {
      console.error("Loi khi fetch messages: ", error);
    } finally {
      dispatch(setMessageLoading(false));
    }
  };

  const sendDirectMessage = async (
    recipientId: string,
    content: string,
    imgUrl?: string,
  ) => {
    try {
      const state = store.getState();
      const { token } = state.auth;
      const { activeConversationId } = state.chat;

      if (!token) return;
      if (!activeConversationId) throw new Error("Khong co conversationId");
      await chatService.sendDirectMessage(
        token,
        recipientId,
        content,
        imgUrl,
        activeConversationId,
      );

      dispatch(resetSeenBy(activeConversationId));
    } catch (error) {
      console.error("Loi xay ra khi send direct message", error);
    }
  };

  const addMessage = async (message: Message) => {
    try {
      const state = store.getState();
      const { user } = state.auth;
      const { messages } = state.chat;

      if (!user) return;

      const updatedMessage = {
        ...message,
        isOwn: message.senderId === user?._id,
      };
      const convoId = updatedMessage.conversationId;

      if (!convoId) return;

      if (!messages[convoId]) {
        console.log("hook fetch: ", messages[convoId]);
        await fetchMessages(convoId);
      }

      dispatch(addMessageRealtime({ convoId, message: updatedMessage }));
    } catch (error) {
      console.log("loi xay ra khi add message", error);
    }
  };

  return { fetchMessages, fetchConversations, sendDirectMessage, addMessage };
};
