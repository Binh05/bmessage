import { useAppSelector } from "@/lib/hooks";
import { friendSelector } from "@/lib/selector";
import FriendCard from "./FriendCard";
import { useFriend } from "@/hooks/useFriend";
import { useEffect } from "react";
import { useChat } from "@/hooks/useChat";
import { MessageCircleMore, User } from "lucide-react";

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

      {friends.length === 0 ? (
        <div className="text-muted-foreground/70 flex min-h-60 flex-col items-center justify-center">
          <User className="size-30 stroke-[0.8px]" />{" "}
          <span>Bạn chưa có bạn bè nào</span>
        </div>
      ) : (
        <div className="beautiful-scrollbar max-h-60 space-y-2 overflow-y-auto">
          {friends.map((f) => (
            <FriendCard
              onClick={() => createConvoHanlde(f._id)}
              key={f._id}
              user={f}
              action={<MessageCircleMore />}
              className="transition-smooth hover:shadow-soft glass hover:bg-muted/30 group/friendCard cursor-pointer p-3"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendList;
