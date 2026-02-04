import { useAppSelector } from "@/lib/hooks";
import { SidebarInset } from "../ui/sidebar";
import ChatWindowHeader from "./ChatWindowHeader";
import MessageInput from "./MessageInput";
import ChatWelcomeScreen from "./ChatWelcomeScreen";
import ChatWindowBody from "./ChatWindowBody";
import { chatSelector } from "@/lib/selector";

const ChatWindowLayout = () => {
  const { conversations, activeConversationId } = useAppSelector(chatSelector);

  const selectedConvo =
    conversations.find((convo) => convo._id === activeConversationId) ?? null;

  if (!activeConversationId) {
    return <ChatWelcomeScreen />;
  }
  return (
    <SidebarInset className="flex h-full flex-1 flex-col overflow-hidden rounded-sm shadow-md">
      {/* Header */}
      <ChatWindowHeader />

      {/* Content */}
      <div className="bg-primary-foreground flex-1 overflow-y-auto">
        <ChatWindowBody />
      </div>

      {/* Footer */}
      <MessageInput />
    </SidebarInset>
  );
};

export default ChatWindowLayout;
