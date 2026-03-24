import { useAppSelector } from "@/lib/hooks";
import { friendSelector } from "@/lib/selector";
import FriendCard from "./FriendCard";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";

const ReceivedRequest = () => {
  const { receivedList } = useAppSelector(friendSelector);

  if (receivedList.length == 0)
    return (
      <p className="text-muted-foreground text-center text-sm">
        Bạn chưa gửi lời mời kết bạn nào.
      </p>
    );

  return (
    <div className="flex flex-col gap-1.5">
      {receivedList.map((r) => (
        <FriendCard
          key={r._id}
          user={r.from}
          action={
            <Button className="bg-gradient-primary cursor-pointer hover:opacity-90">
              Chấp nhận
            </Button>
          }
        />
      ))}
    </div>
  );
};

export default ReceivedRequest;
