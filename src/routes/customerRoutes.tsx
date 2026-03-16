import { lazy } from "react";
import type { ISidebarItem } from "@/types";

const CustomerSettingPage = lazy(
  () => import("@/pages/Dashboard/Customer/CustomerSettingPage"),
);
const ClientListPage = lazy(
  () => import("@/pages/Dashboard/Customer/ClientListPage"),
);
const OrderDetailsPage = lazy(
  () => import("@/pages/Dashboard/Customer/OrderDetailsPage"),
);
const OrderHistoryPage = lazy(
  () => import("@/pages/Dashboard/Customer/OrderHistoryPage"),
);
const OrderListPage = lazy(() =>
  import("@/pages/Dashboard/Customer/OrderListPage").then((module) => ({
    default: module.OrderListPage,
  })),
);

export const customerRoutes: ISidebarItem[] = [
  {
    title: "Order List",
    url: "/order-list",
    component: OrderListPage,
  },
  {
    title: "Client List",
    url: "/client-list",
    component: ClientListPage,
  },

  {
    title: "Order History",
    url: "/order-history",
    component: OrderHistoryPage,
  },
  {
    title: "Order Details",
    url: "/order-list/order-details/:orderId",
    component: OrderDetailsPage,
    hidden: true,
  },
  {
    title: "Settings",
    url: "/settings",
    component: CustomerSettingPage,
  },
];
