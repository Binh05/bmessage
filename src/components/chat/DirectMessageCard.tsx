import { Conversation } from "@/types/chat";
import ChatCard from "./ChatCard";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import UserAvatar from "./UserAvatar";
import { setActiveConversationId } from "@/lib/features/chatSlice";
import StatusBadge from "./StatusBadge";
import { useChat } from "@/hooks/useChat";
import { authSelector, chatSelector } from "@/lib/selector";

function DirectMessageCard({ convo }: { convo: Conversation }) {
  const { user } = useAppSelector(authSelector);
  const { activeConversationId, messages } = useAppSelector(chatSelector);
  const { fetchMessages } = useChat();
  const dispatch = useAppDispatch();

  if (!user) return null;

  const otherUser = convo.participants.find((parti) => parti._id !== user?._id);

  if (!otherUser) return null;
  const unreadCount = convo.unreadCounts[user._id];

  const hanleSelectConvo = async (id: string) => {
    dispatch(setActiveConversationId(id));
    if (!messages[id]) {
      await fetchMessages(id);
    }
  };

  return (
    <ChatCard
      leftSection={
        <>
          <UserAvatar
            type="sidebar"
            name={otherUser.username}
            avatarUrl={otherUser.avatarUrl}
          />
          <StatusBadge status="offline" />
        </>
      }
      onSelect={hanleSelectConvo}
      isActive={convo._id === activeConversationId}
      convoId={convo._id}
      name={otherUser.username}
      timetamps={
        convo.lastMessage?.createdAt
          ? new Date(convo.lastMessage.createdAt)
          : undefined
      }
      subtitle={
        convo.lastMessage?.content ??
        "Hãy gửi tin nhắn để bắt đầu cuộc trò chuyện"
      }
      unreadCount={unreadCount}
    />
  );
}

export default DirectMessageCard;
