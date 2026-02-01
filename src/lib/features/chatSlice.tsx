import { Conversation, Message } from "@/types/chat";
import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
    conversations: Conversation[];
    messages: Record<
        string,
        {
            items: Message;
            hasMore: boolean;
            cursor: string | null;
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
        setChat: (state, action) => {
            state.conversations = action.payload.conversations;
            state.messages = action.payload.messages;
        },
        setConversations: (state, action) => {
            state.conversations = action.payload;
        },
        setActiveConversationId: (state, action) => {
            state.activeConversationId = action.payload;
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
export const { setChat, setActiveConversationId, clearChat, setConversations } =
    chatSlice.actions;
