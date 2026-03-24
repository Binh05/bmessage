import { Friend } from "@/types/user";
import UserAvatar from "../chat/UserAvatar";
import { Card, CardFooter } from "../ui/card";
import { ReactNode } from "react";

interface FriendCardProps {
  user?: Friend;
  action: ReactNode;
}

function FriendCard({ user, action }: FriendCardProps) {
  if (!user) return;

  return (
    <Card className="glass border-none py-3 pl-3">
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <UserAvatar
            type="sidebar"
            name={user.username}
            avatarUrl={user.avatarUrl}
          />
          <div>
            <p>{user.username}</p>
            <p>{user.email}</p>
          </div>
        </div>
        <CardFooter>{action}</CardFooter>
      </div>
    </Card>
  );
}

export default FriendCard;
