import type { NotificationType } from "@/types/dashboard";
import {
  Bell,
  Package,
  BadgeCheck,
  AlertTriangle,
  MessageSquare,
} from "lucide-react";
export function TypeIcon(type: NotificationType) {
  switch (type) {
    case "order":
      return <Package className="h-4 w-4 text-primary" />;
    case "payout":
      return <BadgeCheck className="h-4 w-4 text-primary" />;
    case "message":
      return <MessageSquare className="h-4 w-4 text-primary" />;
    case "warning":
      return <AlertTriangle className="h-4 w-4 text-destructive" />;
    default:
      return <Bell className="h-4 w-4 text-primary" />;
  }
}
