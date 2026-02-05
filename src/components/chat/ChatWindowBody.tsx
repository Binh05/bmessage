import { useAppSelector } from "@/lib/hooks";
import { chatSelector } from "@/lib/selector";
import ChatWelcomeScreen from "./ChatWelcomeScreen";
import MessageItem from "./MessageItem";

const ChatWindowBody = () => {
  const {
    conversations,
    activeConversationId,
    messages: allMessages,
  } = useAppSelector(chatSelector);

  const messages = allMessages[activeConversationId!]?.items ?? [];
  const selectedConvo = conversations.find(
    (convo) => convo._id === activeConversationId,
  );

  if (!selectedConvo) {
    return <ChatWelcomeScreen />;
  }

  if (!messages?.length) {
    return (
      <div className="text-muted-foreground flex h-full items-center justify-center">
        Bạn chưa có tin nhắn nào.
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col overflow-hidden p-4">
      <div className="beautiful-scrollbar bg-primary-foreground flex flex-col overflow-x-hidden overflow-y-auto">
        {messages.map((message, i) => (
          <MessageItem
            key={message?._id ?? i}
            message={message}
            index={i}
            messages={messages}
            selectedConvo={selectedConvo}
            lastMessageStatus="delivered"
          />
        ))}
      </div>
    </div>
  );
};

export default ChatWindowBody;
