import { useAppSelector } from "@/lib/hooks";
import { Conversation } from "@/types/chat";
import { SidebarTrigger } from "../ui/sidebar";
import { authSelector, chatSelector, socketSelector } from "@/lib/selector";
import { Separator } from "../ui/separator";
import UserAvatar from "./UserAvatar";
import StatusBadge from "./StatusBadge";

const ChatWindowHeader = ({ chat }: { chat?: Conversation }) => {
  const { conversations, activeConversationId } = useAppSelector(chatSelector);
  const { user } = useAppSelector(authSelector);
  const { onlineUsers } = useAppSelector(socketSelector);
  let otherUser;

  chat =
    chat ?? conversations.find((convo) => convo._id === activeConversationId);

  if (!chat) {
    return (
      <header className="sticky top-0 z-10 flex w-full items-center px-4 py-2 md:hidden">
        <SidebarTrigger className="-ml-1" />
      </header>
    );
  }

  if (chat.type === "direct") {
    const otherUsers = chat.participants.filter((p) => p._id !== user?._id);
    otherUser = otherUsers.length > 0 ? otherUsers[0] : null;

    if (!user || !otherUser) return null;
  }

  return (
    <header className="bg-background sticky top-0 z-10 flex items-center px-4 py-2">
      <div className="flex w-full items-center gap-2">
        <SidebarTrigger />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />

        <div className="flex w-full items-center gap-3 p-2">
          <div className="relative">
            {chat.type === "direct" ? (
              <>
                <UserAvatar
                  type="sidebar"
                  name={otherUser?.username || "Bmessage"}
                  avatarUrl={otherUser?.avatarUrl || undefined}
                />
                <StatusBadge
                  status={
                    onlineUsers.includes(otherUser?._id ?? "")
                      ? "online"
                      : "offline"
                  }
                />
              </>
            ) : (
              <></>
            )}
          </div>
          <h2 className="text-foreground font-semibold">
            {chat.type === "direct" ? otherUser?.username : ""}
          </h2>
        </div>
      </div>
    </header>
  );
};

export default ChatWindowHeader;
