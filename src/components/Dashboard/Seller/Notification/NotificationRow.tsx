import { Circle } from "lucide-react";
import { TypeBadge } from "./TypeBadge";
import { TypeIcon } from "./TypeIcon";
import type { NotificationItem } from "@/types/dashboard";
import { cn } from "@/lib/utils";

export function NotificationRow({
  item,
  onClick,
}: {
  item: NotificationItem;
  onClick?: (id: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onClick?.(item.id)}
      className={cn(
        "w-full text-left rounded-2xl border bg-card px-4 py-3 transition",
        "hover:bg-muted/10 hover:border-border",
        item.unread ? "border-primary/30" : "border-border",
      )}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-muted/10">
          {TypeIcon(item.type)}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate text-[14px] font-semibold text-foreground">
              {item.title}
            </p>
            {item.unread ? (
              <span className="inline-flex items-center gap-1 text-[12px] text-primary">
                <Circle className="h-2 w-2 fill-primary text-primary" />
                New
              </span>
            ) : null}
          </div>

          {item.description ? (
            <p className="mt-0.5 line-clamp-2 text-[13px] text-muted-foreground">
              {item.description}
            </p>
          ) : null}

          <div className="mt-2 flex items-center justify-between">
            {TypeBadge(item.type)}
            <span className="text-[12px] text-muted-foreground">
              {item.time}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}
