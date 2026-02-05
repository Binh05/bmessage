import { urlBase } from "@/utils/api";
import { Message } from "@/types/chat";

const URL_BASE = process.env.NEXT_PUBLIC_API_BASE ?? urlBase;

interface MessagesResponse {
  messages: Message[];
  cursor?: string;
}

const pageLimit = 50;

export const chatService = {
  fetchConversation: async (token: string) => {
    const res = await fetch(`${URL_BASE}/conversations`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Loi khi lay danh sach cuoc hoi thoai");
    }

    return data;
  },

  fetchMessages: async (
    token: string,
    id: string,
    cursor?: string,
  ): Promise<MessagesResponse> => {
    const res = await fetch(
      `${URL_BASE}/conversations/${id}/messages?limit=${pageLimit}&cursor=${cursor}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      },
    );

    const data = await res.json();

    return {
      messages: data.messages,
      cursor: data.nextCursor,
    };
  },

  sendDirectMessage: async (
    token: string,
    recipientId: string,
    content: string = "",
    imgUrl?: string,
    conversationId?: string,
  ) => {
    const res = await fetch(`${URL_BASE}/messages/direct`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        recipientId,
        content,
        imgUrl,
        conversationId,
      }),
      credentials: "include",
    });

    const data = await res.json();

    return data;
  },
};
