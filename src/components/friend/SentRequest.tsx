import { useAppSelector } from "@/lib/hooks";
import { friendSelector } from "@/lib/selector";
import FriendCard from "./FriendCard";
import { Button } from "../ui/button";

const SentRequest = () => {
  const { sentList } = useAppSelector(friendSelector);

  if (!sentList)
    return (
      <p className="text-muted-foreground text-center text-sm">
        Bạn chưa gửi lời mời kết bạn nào.
      </p>
    );

  return (
    <div className="space-y-1">
      {sentList.map((s) => (
        <FriendCard
          key={s._id}
          user={s.to}
          action={
            <Button
              variant={"destructive"}
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
