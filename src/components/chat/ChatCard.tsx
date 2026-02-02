import { cn, formatMessageTime } from "@/lib/utils";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";

interface ChatCardProps {
  convoId: string;
  leftSection?: React.ReactNode;
  name?: string;
  timetamps?: Date;
  subtitle?: string;
  unreadCount: number;
  isActive?: boolean;
  onActive?: (id: string) => void;
  onSelect: (id: string) => void;
}

function ChatCard({
  convoId,
  leftSection,
  name,
  timetamps,
  subtitle,
  unreadCount,
  isActive,
  onSelect,
}: ChatCardProps) {
  return (
    <Card
      key={convoId}
      onClick={() => onSelect(convoId)}
      className={cn(
        "border-none p-3 cursor-pointer transition-smooth glass hover:bg-muted/30",
        isActive &&
          "ring-2 ring-primary/50 bg-linear-to-tr from-primary-glow/10 to-primary-foreground",
      )}
    >
      <div className="flex gap-4 items-center">
        <div className="relative">{leftSection}</div>
        <div className="min-w-0 flex-1">
          <div className="flex justify-between w-full">
            <p
              className={cn(
                "text-sm truncate",
                unreadCount > 0 && "text-foreground font-bold",
              )}
            >
              {name}
            </p>
            <p className="text-sm">
              {timetamps ? formatMessageTime(timetamps) : ""}
            </p>
          </div>
          <div className="flex justify-between items-center ">
            <p
              className={cn(
                "truncate text-sm text-muted-foreground",
                unreadCount > 0 && "text-foreground font-bold",
              )}
            >
              {subtitle}
            </p>
            {unreadCount > 0 && (
              <div className="pulse-ring">
                <Badge
                  variant="destructive"
                  className="size-5 border border-background text-xs text-white"
                >
                  {unreadCount > 9 ? "9+" : unreadCount}
                </Badge>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default ChatCard;
