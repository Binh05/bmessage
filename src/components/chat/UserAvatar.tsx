import { AvatarImage } from "@radix-ui/react-avatar";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { cn } from "@/lib/utils";

interface IUserAvatarProps {
  type: "chat" | "profile" | "sidebar";
  name: string;
  avatarUrl?: string;
  className?: string;
}

function UserAvatar({
  type,
  name = "bmessage",
  avatarUrl,
  className,
}: IUserAvatarProps) {
  const bgColor = !avatarUrl ? "bg-blue-500" : "";

  return (
    <Avatar
      className={cn(
        className,
        type === "sidebar" && "size-12 text-base",
        type === "chat" && "size-8 text-sm",
        type === "profile" && "size-24 text-3xl shadow-md",
      )}
    >
      <AvatarImage src={avatarUrl} alt="avatar friend" />
      <AvatarFallback className={`${bgColor} font-semibold text-white`}>
        {name.charAt(0)}
      </AvatarFallback>
    </Avatar>
  );
}

export default UserAvatar;
