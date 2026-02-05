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
        "transition-smooth glass hover:bg-muted/30 cursor-pointer border-none p-3",
        isActive &&
          "ring-primary/50 from-primary-glow/10 to-primary-foreground bg-linear-to-tr ring-2",
      )}
    >
      <div className="flex items-center gap-4">
        <div className="relative">{leftSection}</div>
        <div className="min-w-0 flex-1 gap-1">
          <div className="flex w-full justify-between">
            <p
              className={cn(
                "truncate text-sm font-semibold",
                unreadCount > 0 && "text-foreground font-bold",
              )}
            >
              {name}
            </p>
            <p className="text-sm">
              {timetamps ? formatMessageTime(timetamps) : ""}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={cn(
                "text-muted-foreground truncate text-sm",
                unreadCount > 0 && "text-foreground font-bold",
              )}
            >
              {subtitle}
            </p>
            {unreadCount > 0 && (
              <div className="pulse-ring">
                <Badge
                  variant="destructive"
                  className="border-background size-5 border text-xs text-white"
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
