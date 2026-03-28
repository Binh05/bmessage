import { Message } from "@/types/chat";
import { api } from "@/lib/api";

interface MessagesResponse {
  messages: Message[];
  cursor?: string;
}

const pageLimit = 50;

export const chatService = {
  fetchConversation: async () => {
    const res = await api.get("/conversations");

    return res.data;
  },

  fetchMessages: async (
    id: string,
    cursor?: string,
  ): Promise<MessagesResponse> => {
    const res = await api.get(
      `/conversations/${id}/messages?limit=${pageLimit}&cursor=${cursor}`,
    );

    const data = await res.data;

    return {
      messages: data.messages,
      cursor: data.nextCursor,
    };
  },

  sendDirectMessage: async (
    recipientId: string,
    content: string = "",
    imgUrl?: string,
    conversationId?: string,
  ) => {
    const res = await api.post(`/messages/direct`, {
      recipientId,
      content,
      imgUrl,
      conversationId,
    });

    return res.data;
  },

  createConvo: async (
    type: "direct" | "group",
    name: string = "",
    memberIds: string[],
  ) => {
    const res = await api.post("/conversations", { type, name, memberIds });

    return res.data.conversation;
  },
};
