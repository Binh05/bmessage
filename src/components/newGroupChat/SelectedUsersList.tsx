import type { Friend } from "@/types/user";
import UserAvatar from "../chat/UserAvatar";
import { X } from "lucide-react";

interface SelectedUsersListProps {
  invitedUsers: Friend[];
  onRemove: (user: Friend) => void;
}

const SelectedUsersList = ({
  invitedUsers,
  onRemove,
}: SelectedUsersListProps) => {
  if (invitedUsers.length === 0) {
    return;
  }
  return (
    <div className="flex flex-wrap gap-2 pt-2">
      {invitedUsers.map((user) => (
        <div
          key={user._id}
          className="bg-muted flex items-center gap-1 rounded-full px-3 py-1 text-sm"
        >
          <UserAvatar
            type="chat"
            name={user.username}
            avatarUrl={user.avatarUrl}
          />
          <span>{user.username}</span>

          <X
            className="hover:text-destructive size-3 cursor-pointer"
            onClick={() => onRemove(user)}
          />
        </div>
      ))}
    </div>
  );
};

export default SelectedUsersList;
