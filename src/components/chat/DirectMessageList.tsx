import DirectMessageCard from "./DirectMessageCard";
import { useAppSelector } from "@/lib/hooks";
import { authSelector, chatSelector } from "@/lib/selector";

function DirectMessageList({ searchConvo }: { searchConvo: string }) {
  const { conversations } = useAppSelector(chatSelector);
  const { user } = useAppSelector(authSelector);
  const directConversation = conversations.filter(
    (convo) =>
      convo.type === "direct" &&
      convo.participants
        .find((p) => p._id !== user?._id)
        ?.username.includes(searchConvo),
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
