import { Conversation, Message } from "@/types/chat";
import UserAvatar from "./UserAvatar";
import { Card } from "../ui/card";
import { cn, formatMessageTime } from "@/lib/utils";
import { Badge } from "../ui/badge";

interface MessageItemProps {
  message: Message;
  index: number;
  messages: Message[];
  selectedConvo: Conversation;
  lastMessageStatus: "delivered" | "seen";
}

const MessageItem = ({
  message,
  index,
  messages,
  selectedConvo,
  lastMessageStatus,
}: MessageItemProps) => {
  const prev = messages[index - 1];

  const isGroupBreak =
    index === 0 ||
    message.senderId !== prev.senderId ||
    new Date(message.createdAt).getTime() - new Date(prev.createdAt).getTime() >
      300000;

  const participant = selectedConvo.participants.find(
    (p) => p._id.toString() === message.senderId.toString(),
  );

  return (
    <div
      className={cn(
        "message-bounce mt-1 flex gap-2",
        message.isOwn ? "justify-end" : "justify-start",
      )}
    >
      {/* avatar */}
      {!message.isOwn && (
        <div className="w-8">
          {isGroupBreak && (
            <UserAvatar
              type="chat"
              name={participant?.username || "bmessage"}
              avatarUrl={participant?.avatarUrl ?? undefined}
            />
          )}
        </div>
      )}

      {/* message */}
      <div
        className={cn(
          "flex max-w-xs flex-col space-y-1 lg:max-w-md",
          message.isOwn ? "items-end" : "items-start",
        )}
      >
        <Card
          className={cn(
            "p-3",
            message.isOwn
              ? "chat-bubble-sent border-0"
              : "chat-bubble-received",
          )}
        >
          <p className="text-sm leading-relaxed wrap-break-word">
            {message.content}
          </p>
        </Card>

        {isGroupBreak && (
          <span>{formatMessageTime(new Date(message.createdAt))}</span>
        )}

        {message.isOwn && message._id === selectedConvo.lastMessage?._id && (
          <Badge
            variant={"outline"}
            className={cn(
              "h-4 border-0 px-1.5 py-0.5 text-xs",
              lastMessageStatus === "seen"
                ? "bg-primary/20 text-primary"
                : "bg-muted text-muted-foreground",
            )}
          >
            {lastMessageStatus}
          </Badge>
        )}
      </div>
    </div>
  );
};

export default MessageItem;
