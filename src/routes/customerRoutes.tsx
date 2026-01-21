import CustomerSetting from "@/pages/Dashboard/Customer/CustomerSetting";
import OrderHistory from "@/pages/Dashboard/Customer/OrderHistory";
import { OrderListPage } from "@/pages/Dashboard/Customer/OrderListPage";
import type { ISidebarItem } from "@/types";

export const customerRoutes: ISidebarItem[] = [
  {
    title: "Order List",
    url: "/order-list",
    component: OrderListPage ,
  },
  {
    title: "Order History",
    url: "/order-history",
    component: OrderHistory,
  },
  {
    title: "Settings",
    url: "/settings",
    component: CustomerSetting,
  },
];
