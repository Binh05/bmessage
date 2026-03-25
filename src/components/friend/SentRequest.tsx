import { useAppSelector } from "@/lib/hooks";
import { friendSelector } from "@/lib/selector";
import FriendCard from "./FriendCard";
import { Button } from "../ui/button";
import { useFriend } from "@/hooks/useFriend";

const SentRequest = () => {
  const { sentList, loading } = useAppSelector(friendSelector);
  const { cancelFriendRequest } = useFriend();

  if (!sentList)
    return (
      <p className="text-muted-foreground text-center text-sm">
        Bạn chưa gửi lời mời kết bạn nào.
      </p>
    );

  return (
    <div className="flex flex-col gap-1.5">
      {sentList.map((s) => (
        <FriendCard
          key={s._id}
          user={s.to}
          action={
            <Button
              disabled={loading}
              onClick={() => cancelFriendRequest(s._id)}
              variant={"ghost"}
              className="cursor-pointer hover:opacity-90"
            >
              Thu hồi
            </Button>
          }
        />
      ))}
    </div>
  );
};

export default SentRequest;
