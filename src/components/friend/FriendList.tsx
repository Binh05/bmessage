import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { chatSelector, friendSelector } from "@/lib/selector";
import FriendCard from "./FriendCard";
import { MessageCircleMore } from "lucide-react";
import { useFriend } from "@/hooks/useFriend";
import { useEffect } from "react";
import { useChat } from "@/hooks/useChat";

const FriendList = () => {
  const { friends } = useAppSelector(friendSelector);
  const { getFriends } = useFriend();
  const { createConvo } = useChat();

  useEffect(() => {
    getFriends();
  }, []);

  if (!friends) return;

  const createConvoHanlde = (friendId: string) => {
    createConvo("direct", "", [friendId]);
  };

  return (
    <div className="space-y-4">
      <div className="text-muted-foreground mb-3 text-sm font-semibold tracking-wide uppercase">
        <h1>Danh sách bạn bè</h1>
      </div>

      <div className="beautiful-scrollbar max-h-60 space-y-2 overflow-y-auto">
        {friends.map((f) => (
          <FriendCard
            onClick={() => createConvoHanlde(f._id)}
            key={f._id}
            user={f}
            action={<MessageCircleMore className="text-muted-foreground" />}
            className="transition-smooth hover:shadow-soft glass hover:bg-muted/30 group/friendCard cursor-pointer p-3"
          />
        ))}
      </div>
    </div>
  );
};

export default FriendList;
