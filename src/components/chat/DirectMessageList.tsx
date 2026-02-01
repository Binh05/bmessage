import DirectMessageCard from "./DirectMessageCard";
import { useAppSelector } from "@/lib/hooks";

function DirectMessageList() {
    const { conversations } = useAppSelector((state) => state.chatReducer);
    const directConversation = conversations.filter(
        (convo) => convo.type === "direct",
    );

    return (
        <div className="flex flex-col gap-2">
            DirectMessageList
            {directConversation.map((convo) => (
                <DirectMessageCard convo={convo} key={convo._id} />
            ))}
        </div>
    );
}

export default DirectMessageList;
