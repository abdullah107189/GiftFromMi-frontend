import type { ISidebarItem } from "@/types";
import OrdersPage from "@/pages/Dashboard/Seller/OrderTable";
import Scheduling from "@/pages/Dashboard/Seller/Scheduling";
import Campaigns from "@/pages/Dashboard/Seller/Campaigns";
import Billing from "@/pages/Dashboard/Seller/Billing";
import Settings from "@/pages/Dashboard/Seller/Settings";
import Recipients from "@/pages/Dashboard/Seller/Recipients";

export const sellerRoutes: ISidebarItem[] = [
  {
    title: "Orders",
    url: "/orders",
    component: OrdersPage,
  },
  {
    title: "Recipients",
    url: "/recipients",
    component: Recipients,
  },
  {
    title: "Scheduling",
    url: "/scheduling",
    component: Scheduling,
  },
  {
    title: "Campaigns",
    url: "/campaigns",
    component: Campaigns,
  },
  {
    title: "Billing",
    url: "/billing",
    component: Billing,
  },
  {
    title: "Settings",
    url: "/settings",
    component: Settings,
  },
];
