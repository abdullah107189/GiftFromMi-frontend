import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import App from "@/App";
import { PageLoader } from "@/components/shared/PageLoader.tsx";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import ForgotPassword from "@/components/auth/ForgotPassword";
import OTPVerification from "@/components/auth/OTPVerification";

const HomePage = lazy(() => import("@/pages/HomePage"));

import SellerDashboardPage from "@/pages/Dashboard/Seller/SellerDashboardPage";

import { generateRoutes } from "@/utils/genarateRoute";
import { publicRoutes } from "./publicRoutes";
import { withAuth } from "@/utils/withAuth";
import { Role } from "@/types";
import SellerDashboard from "@/components/layout/SellerDashboard";
import { sellerRoutes } from "./sellerRoutes";
import CustomerDashboard from "@/components/layout/CustomerDashboard";
import PersonalInfo from "@/components/Dashboard/Customer/PersonalInfo/PersonalInfo";

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
    path: "seller-dashboard",
    Component: withAuth(SellerDashboard, Role.seller),
    children: [
      {
        index: true,
        element: <SellerDashboardPage></SellerDashboardPage>,
      },
      ...generateRoutes(sellerRoutes),
    ],
  },
  {
    path: "customer-dashboard",
    Component: withAuth(CustomerDashboard, Role.customer),
    children: [
      {
        index: true,
        element: <PersonalInfo></PersonalInfo>,
      },
      ...generateRoutes(sellerRoutes),
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
