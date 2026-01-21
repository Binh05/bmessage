import { cn } from "@/lib/utils";
import { Card } from "../ui/card";

interface ChatCardProps {
    convoId?: string;
    leftSection?: React.ReactNode;
    name?: string;
    timetamps?: string;
    subtitle?: string;
    unreadCount?: number;
    isActive?: boolean;
    onActive?: (id: string) => void;
}

function ChatCard({
    convoId,
    leftSection,
    name,
    timetamps,
    subtitle,
    unreadCount,
    isActive,
}: ChatCardProps) {
    return (
        <Card
            key={convoId}
            className={cn(
                "glass border-none bg-none shadow-none",
                isActive && "",
            )}
        >
            <div>
                <div>{leftSection}</div>
                <div>
                    <div className="flex justify-between">
                        <p className="text-sm truncate">{name}</p>
                        <p>{timetamps}</p>
                    </div>
                    <div>
                        <p>{subtitle}</p>
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
