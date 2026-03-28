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
    <div className="mt-2 flex flex-col gap-2">
      {directConversation.map((convo) => (
        <DirectMessageCard convo={convo} key={convo._id} />
      ))}
    </div>
  );
}

export default DirectMessageList;
