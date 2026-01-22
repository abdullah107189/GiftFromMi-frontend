import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { NotificationType } from "@/types/dashboard";

export function TypeBadge(t: NotificationType) {
  const base = "rounded-full px-2 py-0.5 text-[11px] font-medium";
  switch (t) {
    case "order":
      return (
        <Badge
          className={cn(base, "bg-primary/10 text-primary")}
          variant="secondary"
        >
          Order
        </Badge>
      );
    case "payout":
      return (
        <Badge
          className={cn(base, "bg-primary/10 text-primary")}
          variant="secondary"
        >
          Payout
        </Badge>
      );
    case "message":
      return (
        <Badge
          className={cn(base, "bg-muted/10 text-muted-foreground")}
          variant="secondary"
        >
          Message
        </Badge>
      );
    case "warning":
      return (
        <Badge
          className={cn(base, "bg-destructive/10 text-destructive")}
          variant="secondary"
        >
          Alert
        </Badge>
      );
  }
}
