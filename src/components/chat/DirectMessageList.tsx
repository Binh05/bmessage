import { UserPlus } from "lucide-react";
import DirectMessageCard from "./DirectMessageCard";
import { useAppSelector } from "@/lib/hooks";
import { chatSelector } from "@/lib/selector";

function DirectMessageList() {
  const { conversations } = useAppSelector(chatSelector);
  const directConversation = conversations.filter(
    (convo) => convo.type === "direct",
  );

  return (
    <div className="mt-8 flex flex-col gap-2 p-1">
      <div className="flex justify-between">
        <p className="text-muted-foreground text-sm uppercase">Bạn Bè</p>
        <UserPlus className="size-4" />
      </div>
      {directConversation.map((convo) => (
        <DirectMessageCard convo={convo} key={convo._id} />
      ))}
    </div>
  );
}

export default DirectMessageList;
