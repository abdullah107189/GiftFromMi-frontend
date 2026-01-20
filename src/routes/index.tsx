import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import App from "@/App";
import { PageLoader } from "@/components/shared/PageLoader.tsx";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import ForgotPassword from "@/components/auth/ForgotPassword";
import OTPVerification from "@/components/auth/OTPVerification";
import BookSetupCall from "@/pages/BookSetupCall";
import { ShoppingCart } from "@/pages/ShoppingCart";

const HomePage = lazy(() => import("@/pages/HomePage"));
const HowItWorksPage = lazy(() => import("@/pages/HowItWorksPage"));
const ShopGiftsPage = lazy(() => import("@/pages/ShopGiftsPage"));
const ProductDetails = lazy(
  () => import("@/components/shop-gifts/ProductDetails/ProductDetails"),
);
const ForProfessionalsPage = lazy(() => import("@/pages/ForProfessionalsPage"));
const BulkAutomationPage = lazy(() => import("@/pages/BulkAutomationPage"));
const ContactUsPage = lazy(() => import("@/pages/ContactUsPage"));
import PrivetRoute from "@/routes/privates/PrivateRoute.tsx";
import SellerDashboard from "@/components/layout/SellerDashboard";
import SellerDashboardPage from "@/pages/Dashboard/Seller/SellerDashboardPage";
import OrdersPage from "@/pages/Dashboard/Seller/OrderTable";
import Scheduling from "@/pages/Dashboard/Seller/Scheduling";
import Campaigns from "@/pages/Dashboard/Seller/Campaigns";
import Billing from "@/pages/Dashboard/Seller/Billing";
import Settings from "@/pages/Dashboard/Seller/Settings";
import Recipients from "@/pages/Dashboard/Seller/Recipients";
import { generateRoutes } from "@/utils/genarateRoute";
import { publicRoutes } from "./publicRoutes";
import { withAuth } from "@/utils/withAuth";
import { Role } from "@/types";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <HomePage />
          </Suspense>
        ),
      },
      ...generateRoutes(publicRoutes),
    ],
  },
  // dashboardRoutes,
  {
    path: "dashboard",
    Component: withAuth(SellerDashboard, Role.seller),
    children: [
      {
        index: true,
        element: <SellerDashboardPage></SellerDashboardPage>,
      },
      {
        path: "orders",
        element: <OrdersPage></OrdersPage>,
      },
      {
        path: "recipients",
        element: <Recipients></Recipients>,
      },
      {
        path: "scheduling",
        element: <Scheduling></Scheduling>,
      },
      {
        path: "campaigns",
        element: <Campaigns></Campaigns>,
      },
      {
        path: "billing",
        element: <Billing></Billing>,
      },
      {
        path: "settings",
        element: <Settings></Settings>,
      },

      // customer dahsboard

      // {
      //   path: "employee-list",
      //   element: (
      //     <HRRoute>
      //       <EmployeeList></EmployeeList>
      //     </HRRoute>
      //   ),
      // },
    ],
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/register",
    Component: RegisterPage,
  },
  {
    path: "/forgot-password",
    Component: ForgotPassword,
  },
  {
    path: "/otp",
    Component: OTPVerification,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default router;
