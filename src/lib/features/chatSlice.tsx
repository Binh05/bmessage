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

const initialState: InitialState = {
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
  setMessageLoading,
  setMessages,
} = chatSlice.actions;
