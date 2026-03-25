import { User } from "@/types/user";
import UserAvatar from "../chat/UserAvatar";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { useAppSelector } from "@/lib/hooks";
import { socketSelector } from "@/lib/selector";
import { cn } from "@/lib/utils";

export default function ProfileCard({ user }: { user: User | null }) {
  const { onlineUsers } = useAppSelector(socketSelector);

  if (!user) return;

  const isOnline = onlineUsers.includes(user?._id) ? true : false;

  if (!user?.bio) {
    user.bio = "Hãy chia sẽ về bản thân mình";
  }

  return (
    <Card className="mb-2 h-52 overflow-hidden border-0 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 p-0">
      <CardContent className="mt-20 flex flex-col items-center gap-6 pb-8 sm:flex-row sm:items-end">
        <div className="">
          <UserAvatar
            type="profile"
            name={user?.username ?? "bmessage"}
            avatarUrl={user?.avatarUrl ?? ""}
          />
        </div>

        {/* info user */}

        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            {user?.username}
          </h1>
          {user.bio && (
            <p className="mt-2 line-clamp-2 max-w-lg text-sm text-white/70">
              {user.bio}
            </p>
          )}
        </div>

        <Badge
          className={cn(
            "flex items-center",
            isOnline
              ? "bg-green-100 text-green-700"
              : "bg-slate-700 text-slate-100",
          )}
        >
          <div
            className={cn(
              "size-2 animate-pulse rounded-full",
              isOnline ? "bg-green-500" : "bg-slate-100",
            )}
          ></div>
          {isOnline ? "online" : "offline"}
        </Badge>
      </CardContent>
    </Card>
  );
}
