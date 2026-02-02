import { cn } from "@/lib/utils";

const StatusBadge = ({ status }: { status: "online" | "offline" }) => {
  return (
    <div
      className={cn(
        "rounded-full size-4 absolute -bottom-0.5 z-20 -right-0.5 border border-card",
        status === "online" && "status-online",
        status === "offline" && "status-offline",
      )}
    ></div>
  );
};

export default StatusBadge;
