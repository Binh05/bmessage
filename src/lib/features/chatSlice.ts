import { Conversation, Message } from "@/types/chat";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialState {
  conversations: Conversation[];
  messages: Record<
    string,
    {
      items: Message[];
      hasMore: boolean;
      nextCursor?: string | null;
    }
  >;
  activeConversationId: string | null;
  convoLoading: boolean;
  messageLoading: boolean;
  loading: boolean;
}

export const initialState: InitialState = {
  conversations: [],
  messages: {},
  activeConversationId: null,
  convoLoading: false,
  messageLoading: false,
  loading: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChat: (state, action: PayloadAction<InitialState>) => {
      state.conversations = action.payload.conversations;
      state.messages = action.payload.messages;
    },
    setConversations: (state, action) => {
      state.conversations = action.payload;
    },
    setConvoLoading: (state, action) => {
      state.convoLoading = action.payload;
    },
    updateConversation: (state, action: PayloadAction<Conversation>) => {
      state.conversations = state.conversations.map((c) =>
        c._id === action.payload._id ? { ...c, ...action.payload } : c,
      );
    },
    setMessageLoading: (state, action) => {
      state.messageLoading = action.payload;
    },
    setActiveConversationId: (state, action) => {
      state.activeConversationId = action.payload;
    },
    setMessages: (
      state,
      action: PayloadAction<{
        messages: Message[];
        convoId: string;
        nextCursor?: string | null;
      }>,
    ) => {
      const { messages, convoId, nextCursor } = action.payload;

      const prev = state.messages[convoId]?.items ?? [];
      const merged = prev.length > 0 ? [...messages, ...prev] : messages;

      state.messages[convoId] = {
        items: merged,
        hasMore: !!nextCursor,
        nextCursor: nextCursor ?? null,
      };
    },
    addMessageRealtime: (
      state,
      action: PayloadAction<{ convoId: string; message: Message }>,
    ) => {
      const { convoId, message } = action.payload;

      const prev = state.messages[convoId]?.items ?? [];

      if (prev.some((m) => m._id === message._id)) return;

      state.messages[convoId] = {
        items: [...prev, message],
        hasMore: state.messages[convoId]?.hasMore ?? false,
        nextCursor: state.messages[convoId]?.nextCursor ?? null,
      };
    },
    resetSeenBy: (state, action) => {
      state.conversations = state.conversations.map((c) =>
        c._id === action.payload ? { ...c, seenBy: [] } : c,
      );
    },
    clearChat: (state) => {
      state.conversations = [];
      state.messages = {};
      state.activeConversationId = null;
      state.convoLoading = false;
      state.messageLoading = false;
      state.loading = false;
    },
  },
});

export const chatReducer = chatSlice.reducer;
export const {
  setChat,
  setActiveConversationId,
  clearChat,
  setConversations,
  updateConversation,
  setMessageLoading,
  setMessages,
  addMessageRealtime,
  setConvoLoading,
  resetSeenBy,
} = chatSlice.actions;
