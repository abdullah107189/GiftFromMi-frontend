import {
  LayoutDashboard,
  Package,
  Users,
  CalendarDays,
  Megaphone,
  CreditCard,
  Settings,
  type LucideIcon,
} from "lucide-react";
export interface SidebarItem {
  title: string;
  url: string;
  icon: LucideIcon;
}
export const sellerSideBar: SidebarItem[] = [
  {
    title: "Dashboard",
    url: "/seller-dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Orders",
    url: "/seller-dashboard/orders",
    icon: Package,
  },
  {
    title: "Recipients",
    url: "/seller-dashboard/recipients",
    icon: Users,
  },
  {
    title: "Scheduling",
    url: "/seller-dashboard/scheduling",
    icon: CalendarDays,
  },
  {
    title: "Campaigns",
    url: "/seller-dashboard/campaigns",
    icon: Megaphone,
  },
  {
    title: "Billing",
    url: "/seller-dashboard/billing",
    icon: CreditCard,
  },
  {
    title: "Settings",
    url: "/seller-dashboard/settings",
    icon: Settings,
  },
];
