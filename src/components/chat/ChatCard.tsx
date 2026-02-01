import { cn, formatMessageTime } from "@/lib/utils";
import { Card } from "../ui/card";

interface ChatCardProps {
    convoId: string;
    leftSection?: React.ReactNode;
    name?: string;
    timetamps?: Date;
    subtitle?: string;
    unreadCount?: number;
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
                "glass border-none shadow-none p-4 cursor-pointer ",
                isActive && "bg-primary",
            )}
        >
            <div className="flex gap-4 items-center">
                <div className="">{leftSection}</div>
                <div className="min-w-0 ">
                    <div className="flex justify-between">
                        <p className="text-sm truncate">{name}</p>
                        <p className="text-sm">
                            {timetamps ? formatMessageTime(timetamps) : ""}
                        </p>
                    </div>
                    <div>
                        <p className="truncate text-sm text-muted-foreground">
                            {subtitle} 123
                        </p>
                        {unreadCount && (
                            <div className="rounded-full bg-destructive p-2 text-white">
                                {unreadCount}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default ChatCard;
