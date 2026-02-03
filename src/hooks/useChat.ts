import {
  setConversations,
  setConvoLoading,
  setMessageLoading,
  setMessages,
} from "@/lib/features/chatSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { chatService } from "@/services/chatService";

export const useChat = () => {
  const dispatch = useAppDispatch();
  const { activeConversationId, messages } = useAppSelector(
    (state) => state.chat,
  );
  const { user } = useAppSelector((state) => state.auth);

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

  const fetchMessages = async (conversationId: string) => {
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

  return { fetchMessages, fetchConversations };
};
