import { User } from "@/types/user";
import UserAvatar from "../chat/UserAvatar";
import { Button } from "../ui/button";
import { Card, CardFooter } from "../ui/card";

interface FriendCardProps {
  user: User;
  isFriend: boolean;
}

function FriendCard({ user, isFriend }: FriendCardProps) {
  return (
    <Card className="glass border-none py-3 pl-3">
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <UserAvatar
            type="sidebar"
            name={user.username}
            avatarUrl={user.avatarUrl}
          />
          <p>{user.username}</p>
        </div>
        <CardFooter>
          {isFriend ? (
            <Button variant={"outline"} size={"sm"}>
              Nhắn tin
            </Button>
          ) : (
            <Button
              size="sm"
              className="bg-gradient-primary cursor-pointer border-2 border-white hover:opacity-90"
            >
              Kết bạn
            </Button>
          )}
        </CardFooter>
      </div>
    </Card>
  );
}

export default FriendCard;
