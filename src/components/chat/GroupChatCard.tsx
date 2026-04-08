import React from "react";
import ChatCard from "./ChatCard";
import { Conversation } from "@/types/chat";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  resetUnreadCount,
  setActiveConversationId,
} from "@/lib/features/chatSlice";
import { authSelector, chatSelector, socketSelector } from "@/lib/selector";
import { useChat } from "@/hooks/useChat";
import UserAvatar from "./UserAvatar";
import GroupAvatar from "./GroupAvatar";
import StatusBadge from "./StatusBadge";

interface GroupChatCardProps {
  convo: Conversation;
}

const GroupChatCard = ({ convo }: GroupChatCardProps) => {
  const dispatch = useAppDispatch();
  const { messages, activeConversationId } = useAppSelector(chatSelector);
  const { user } = useAppSelector(authSelector);
  const { onlineUsers } = useAppSelector(socketSelector);
  const { fetchMessages, markSeen } = useChat();

  if (!user) return;

  const handleSelect = async (id: string) => {
    dispatch(setActiveConversationId(id));
    if (!messages[id]) {
      await fetchMessages();
    }
    if (messages[id] && convo.unreadCounts[user._id] > 0) await markSeen(id);
  };

  const unreadCount = convo.unreadCounts[user._id];

  return (
    <ChatCard
      key={convo._id}
      leftSection={
        <>
          <GroupAvatar participants={convo.participants} />{" "}
          <StatusBadge
            status={
              convo.participants.some(
                (u) => onlineUsers.includes(u?._id ?? "") && u._id !== user._id,
              )
                ? "online"
                : "offline"
            }
          />
        </>
      }
      convoId={convo._id}
      onSelect={() => handleSelect(convo._id)}
      name={convo.group.name}
      unreadCount={unreadCount}
      isActive={activeConversationId == convo._id}
      subtitle={
        convo.lastMessage?.content ||
        `Nhóm có ${convo.participants?.length} thành viên`
      }
      timetamps={convo?.createdAt ? new Date(convo.createdAt) : undefined}
    />
  );
};

export default GroupChatCard;
