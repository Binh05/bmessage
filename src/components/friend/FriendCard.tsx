import { Friend } from "@/types/user";
import UserAvatar from "../chat/UserAvatar";
import { Card, CardFooter } from "../ui/card";
import { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FriendCardProps extends HTMLAttributes<HTMLDivElement> {
  user?: Friend;
  action: ReactNode;
  className?: string;
}

function FriendCard({ user, action, className, ...props }: FriendCardProps) {
  if (!user) return;

  return (
    <Card className={cn("glass border-none py-3 pl-3", className)} {...props}>
      <div className="flex items-center justify-between">
        <div className="flex min-w-0 flex-1 gap-3">
          <UserAvatar
            type="sidebar"
            name={user.username}
            avatarUrl={user.avatarUrl}
          />
          <div>
            <p className="truncate font-medium">{user.username}</p>
            <p className="text-muted-foreground truncate text-sm">
              {user.email}
            </p>
          </div>
        </div>
        <CardFooter>{action}</CardFooter>
      </div>
    </Card>
  );
}

export default FriendCard;
