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
import { customerRoutes } from "./customerRoutes";
import PersonalInfoPage from "@/pages/Dashboard/Customer/PersonalInfoPage";

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
  // seller dashboard routes
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

  // customer dashboard routes
  {
    path: "customer-dashboard",
    Component: withAuth(CustomerDashboard, Role.customer),
    children: [
      {
        index: true,
        element: <PersonalInfoPage></PersonalInfoPage>,
      },
      ...generateRoutes(customerRoutes),
    ],
  },

  // auth part routes
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

  // page handler routes
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default router;
