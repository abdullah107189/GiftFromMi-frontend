import {
  LayoutDashboard,
  Package,
  Users,
  CalendarDays,
  Megaphone,
  CreditCard,
  Settings,
  LogOut,
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
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Orders",
    url: "/dashboard/orders",
    icon: Package,
  },
  {
    title: "Recipients",
    url: "/dashboard/recipients",
    icon: Users,
  },
  {
    title: "Scheduling",
    url: "/dashboard/scheduling",
    icon: CalendarDays,
  },
  {
    title: "Campaigns",
    url: "/dashboard/campaigns",
    icon: Megaphone,
  },
  {
    title: "Billing",
    url: "/dashboard/billing",
    icon: CreditCard,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
  {
    title: "Logout",
    url: "/dashboard/logout",
    icon: LogOut,
  },
];
