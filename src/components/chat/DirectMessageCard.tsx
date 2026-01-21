import { Conversation } from "@/types/chat";
import ChatCard from "./ChatCard";

function DirectMessageCard({ convo }: { convo: Conversation }) {
    return <ChatCard convoId={convo._id} />;
}

export default DirectMessageCard;
