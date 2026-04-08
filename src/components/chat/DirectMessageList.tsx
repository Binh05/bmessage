import DirectMessageCard from "./DirectMessageCard";
import { useAppSelector } from "@/lib/hooks";
import { authSelector, chatSelector } from "@/lib/selector";
import GroupChatCard from "./GroupChatCard";

function DirectMessageList() {
  const { conversations } = useAppSelector(chatSelector);

  return (
    <div className="mt-2 flex flex-col gap-2">
      {conversations.map((convo) =>
        convo.type === "direct" ? (
          <DirectMessageCard convo={convo} key={convo._id} />
        ) : (
          <GroupChatCard convo={convo} key={convo._id} />
        ),
      )}
    </div>
  );
}

export default DirectMessageList;
