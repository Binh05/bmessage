import { useAppSelector } from "@/lib/hooks";
import { friendSelector } from "@/lib/selector";
import FriendCard from "./FriendCard";
import { Button } from "../ui/button";
import { useFriend } from "@/hooks/useFriend";

const ReceivedRequest = () => {
  const { receivedList, loading } = useAppSelector(friendSelector);
  const { acceptFriendRequest, declineFriendRequest } = useFriend();

  if (receivedList.length == 0)
    return (
      <p className="text-muted-foreground text-center text-sm">
        Bạn chưa nhận được lời mời kết bạn nào.
      </p>
    );

  return (
    <div className="space-y-4">
      <div className="text-muted-foreground mb-3 flex items-center gap-3 text-sm font-semibold tracking-wide uppercase">
        <h1>Lời mời kết bạn</h1>
        <span className="text-destructive text-xl font-semibold">
          {receivedList.length}
        </span>
      </div>
      <div className="flex flex-col gap-1.5">
        {receivedList.map((r) => (
          <FriendCard
            key={r._id}
            user={r.from}
            action={
              <div className="flex gap-2">
                <Button
                  disabled={loading}
                  onClick={() => declineFriendRequest(r._id)}
                  variant="ghost"
                  className="cursor-pointer"
                >
                  Từ chối
                </Button>
                <Button
                  disabled={loading}
                  onClick={() => acceptFriendRequest(r._id)}
                  className="bg-gradient-primary cursor-pointer hover:opacity-90"
                >
                  Chấp nhận
                </Button>
              </div>
            }
          />
        ))}
      </div>
    </div>
  );
};

export default ReceivedRequest;
