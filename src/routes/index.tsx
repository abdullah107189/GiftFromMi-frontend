import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";
import App from "@/App";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import ForgotPassword from "@/components/auth/ForgotPassword";
import OTPVerification from "@/components/auth/OTPVerification";

const HomePage = lazy(() => import("@/pages/HomePage"));
const LazySellerDashboardPage = lazy(
  () => import("@/pages/Dashboard/Seller/SellerDashboardPage"),
);
const LazySellerDashboard = lazy(
  () => import("@/components/layout/SellerDashboard"),
);
const LazyCustomerDashboard = lazy(
  () => import("@/components/layout/CustomerDashboard"),
);

import { generateRoutes } from "@/utils/genarateRoute";
import { publicRoutes } from "./publicRoutes";
import { sellerRoutes } from "./sellerRoutes";
import { customerRoutes } from "./customerRoutes";
import PersonalInfoPage from "@/pages/Dashboard/Customer/PersonalInfoPage";
import NotFound from "@/components/shared/NotFound";
import ResetPassword from "@/components/auth/ResetPassword";
import PageLoader from "@/components/shared/PageLoader";

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
    element: (
      <Suspense fallback={<PageLoader />}>
        <LazySellerDashboard></LazySellerDashboard>
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <LazySellerDashboardPage></LazySellerDashboardPage>,
      },
      ...generateRoutes(sellerRoutes),
    ],
  },

  // customer dashboard routes
  {
    path: "customer-dashboard",
    element: (
      <Suspense fallback={<PageLoader />}>
        <LazyCustomerDashboard></LazyCustomerDashboard>
      </Suspense>
    ),
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
  {
    path: "/reset-password",
    Component: ResetPassword,
  },

  // page handler routes
  {
    path: "*",
    Component: NotFound,
  },
]);

export default router;
