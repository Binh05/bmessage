import type { Friend } from "@/types/user";
import UserAvatar from "../chat/UserAvatar";

interface InviteSuggestionListProps {
  filteredFriends: Friend[];
  onSelect: (friend: Friend) => void;
}

const IniviteSuggestionList = ({
  filteredFriends,
  onSelect,
}: InviteSuggestionListProps) => {
  if (filteredFriends.length === 0) {
    return;
  }

  return (
    <div className="mt-2 max-h-45 divide-y overflow-y-auto rounded-lg border">
      {filteredFriends.map((friend) => (
        <div
          key={friend._id}
          className="hover:bg-muted flex cursor-pointer items-center gap-3 p-2 transition"
          onClick={() => onSelect(friend)}
        >
          <UserAvatar
            type="chat"
            name={friend.username}
            avatarUrl={friend.avatarUrl}
          />

          <span className="font-medium">{friend.username}</span>
        </div>
      ))}
    </div>
  );
};

export default IniviteSuggestionList;
