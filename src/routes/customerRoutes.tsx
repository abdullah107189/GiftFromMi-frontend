import CustomerSettingPage from "@/pages/Dashboard/Customer/CustomerSettingPage";
import OrderHistoryPage from "@/pages/Dashboard/Customer/OrderHistoryPage";
import { OrderListPage } from "@/pages/Dashboard/Customer/OrderListPage";
import type { ISidebarItem } from "@/types";

export const customerRoutes: ISidebarItem[] = [
  {
    title: "Order List",
    url: "/order-list",
    component: OrderListPage,
  },

  {
    title: "Order History",
    url: "/order-history",
    component: OrderHistoryPage,
  },
  {
    title: "Settings",
    url: "/settings",
    component: CustomerSettingPage,
  },
];
