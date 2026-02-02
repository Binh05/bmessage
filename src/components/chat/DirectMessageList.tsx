import { UserPlus } from "lucide-react";
import DirectMessageCard from "./DirectMessageCard";
import { useAppSelector } from "@/lib/hooks";

function DirectMessageList() {
  const { conversations } = useAppSelector((state) => state.chat);
  const directConversation = conversations.filter(
    (convo) => convo.type === "direct",
  );

  return (
    <div className="flex flex-col gap-2 p-1 mt-8">
      <div className="flex justify-between">
        <p className="uppercase text-muted-foreground text-sm">Bạn Bè</p>
        <UserPlus className="size-4" />
      </div>
      {directConversation.map((convo) => (
        <DirectMessageCard convo={convo} key={convo._id} />
      ))}
    </div>
  );
}

export default DirectMessageList;
