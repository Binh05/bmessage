import { User } from "@/types/user";
import UserAvatar from "../chat/UserAvatar";
import { Card, CardContent } from "../ui/card";

export default function ProfileCard({ user }: { user: User | null }) {
  return (
    <Card className="">
      <CardContent>
        <div className="flex items-center gap-2">
          <UserAvatar
            type="profile"
            name={user?.username ?? "bmessage"}
            avatarUrl={user?.avatarUrl ?? ""}
          />
          <div>
            <p>{user?.username}</p>
            <p>{user?.email}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
