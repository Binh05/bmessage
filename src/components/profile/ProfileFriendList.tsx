import { useFriend } from "@/hooks/useFriend";
import { useAppSelector } from "@/lib/hooks";
import { friendSelector } from "@/lib/selector";
import { useEffect } from "react";
import FriendCard from "../friend/FriendCard";
import { Button } from "../ui/button";
import { User } from "lucide-react";

const ProfileFriendList = () => {
  const { friends } = useAppSelector(friendSelector);
  const { getFriends } = useFriend();
  const { unfriend } = useFriend();

  useEffect(() => {
    getFriends();
  }, []);

  if (!friends) return;

  const handleUnfriend = (friendId: string) => unfriend(friendId);

  return (
    <div className="space-y-4">
      <div className="text-muted-foreground mb-3 text-sm font-semibold tracking-wide uppercase">
        <h1>Danh sách bạn bè</h1>
      </div>

      {friends.length !== 0 ? (
        <div className="beautiful-scrollbar max-h-60 space-y-2 overflow-y-auto">
          {friends.map((f) => (
            <FriendCard
              key={f._id}
              user={f}
              action={
                <Button onClick={() => handleUnfriend(f._id)} variant={"ghost"}>
                  Hủy kết bạn
                </Button>
              }
              className="transition-smooth hover:shadow-soft glass group/friendCard p-3"
            />
          ))}
        </div>
      ) : (
        <div className="text-muted-foreground/70 flex min-h-60 flex-col items-center justify-center">
          <User className="size-30 stroke-[0.8px]" />{" "}
          <span>Bạn chưa có bạn bè nào</span>
        </div>
      )}
    </div>
  );
};

export default ProfileFriendList;
