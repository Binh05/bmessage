import {
  addConvo,
  addMessageRealtime,
  resetSeenBy,
  resetUnreadCount,
  setConversations,
  setConvoLoading,
  setMessageLoading,
  setMessages,
  updateConversation,
} from "@/lib/features/chatSlice";
import { useAppDispatch } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { chatService } from "@/services/chatService";
import { Message } from "@/types/chat";
import { useStore } from "react-redux";

export const useChat = () => {
  const dispatch = useAppDispatch();
  const store = useStore<RootState>();

  const fetchConversations = async () => {
    try {
      dispatch(setConvoLoading(true));

      const data = await chatService.fetchConversation();

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
    const { user } = state.auth;

    const convoId = conversationId ?? activeConversationId;

    if (!convoId) return;

    const current = messages?.[convoId];
    const nextCursor =
      current?.nextCursor === undefined ? "" : current?.nextCursor;

    if (nextCursor === null) return;

    dispatch(setMessageLoading(true));

    try {
      const { messages: fetched, cursor } = await chatService.fetchMessages(
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
      const { activeConversationId } = state.chat;

      if (!activeConversationId) throw new Error("Khong co conversationId");
      await chatService.sendDirectMessage(
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

      dispatch(addMessageRealtime({ convoId, message: updatedMessage }));
      if (!messages[convoId]) {
        console.log("hook fetch: ", messages[convoId]);
        await fetchMessages(convoId);
      }

      dispatch(addMessageRealtime({ convoId, message: updatedMessage }));
    } catch (error) {
      console.log("loi xay ra khi add message", error);
    }
  };

  const createConvo = async (
    type: "direct" | "group",
    name: string,
    memberIds: string[],
  ) => {
    try {
      const convo = await chatService.createConvo(type, name, memberIds);

      dispatch(addConvo(convo));
      fetchMessages(convo._id);
    } catch (error) {
      console.error("Lỗi khi create convo", error);
    }
  };

  const markSeen = async (conversationId: string): Promise<void> => {
    const state = store.getState();
    const userId = state.auth.user?._id;

    if (!userId) return;

    try {
      await chatService.markSeen(conversationId);

      dispatch(resetUnreadCount({ conversationId, userId }));
    } catch (error) {
      console.error("Lỗi khi mark seen trong useChat hook", error);
    }
  };

  const sendGroupMessage = async (conversationId: string, content: string) => {
    try {
      await chatService.sendGroupMessage(conversationId, content);

      dispatch(resetSeenBy(conversationId));
    } catch (error) {
      console.error("Lỗi khi sendGroupMessage trong useChat", error);
    }
  };

  return {
    fetchMessages,
    fetchConversations,
    sendDirectMessage,
    addMessage,
    createConvo,
    markSeen,
    sendGroupMessage,
  };
};
