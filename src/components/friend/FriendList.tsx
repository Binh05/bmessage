import { useAppSelector } from "@/lib/hooks";
import { friendSelector } from "@/lib/selector";
import FriendCard from "./FriendCard";
import { Button } from "../ui/button";
import { MessageCircleMore } from "lucide-react";
import { useFriend } from "@/hooks/useFriend";
import { useEffect } from "react";

const FriendList = () => {
  const { friends } = useAppSelector(friendSelector);
  const { getFriends } = useFriend();

  useEffect(() => {
    getFriends();
  }, []);

  if (!friends) return;

  const createConvoHanlde = () => {};

  return (
    <div className="space-y-4">
      <div className="text-muted-foreground mb-3 text-sm font-semibold tracking-wide uppercase">
        <h1>Danh sách bạn bè</h1>
      </div>

      <div className="beautiful-scrollbar max-h-60 space-y-2 overflow-y-auto">
        {friends.map((f) => (
          <FriendCard
            onClick={createConvoHanlde}
            key={f._id}
            user={f}
            action={<MessageCircleMore />}
            className="transition-smooth hover:shadow-soft glass hover:bg-muted/30 group/friendCard cursor-pointer p-3"
          />
        ))}
      </div>
    </div>
  );
};

export default FriendList;
