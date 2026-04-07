import { Participant } from "@/types/chat";
import UserAvatar from "./UserAvatar";

const limit = 4;

interface GroupAvatarProp {
  participants: Participant[];
}

const GroupAvatar = ({ participants }: GroupAvatarProp) => {
  const avatar = [];
  const n = participants.length > limit ? 3 : participants.length;

  for (let i = 0; i < n; ++i) {
    const member = participants[i];
    avatar.push(
      <UserAvatar
        key={i}
        name={member.username}
        type="group"
        avatarUrl={member.avatarUrl}
        className={
          participants.length === 3 && i === 0 ? "col-span-2 mx-auto" : ""
        }
      />,
    );
  }

  return (
    <div className="grid grid-cols-2 -space-y-1">
      {avatar}
      {participants.length > limit && (
        <div className="bg-muted flex size-6 items-center justify-center rounded-full text-sm">
          {participants.length - 3}
        </div>
      )}
    </div>
  );
};

export default GroupAvatar;
