import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";
import App from "@/App";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import ForgotPassword from "@/components/auth/ForgotPassword";
import OTPVerification from "@/components/auth/OTPVerification";

const HomePage = lazy(() => import("@/pages/HomePage"));

const LazyCustomerDashboard = lazy(
  () => import("@/components/layout/CustomerDashboard"),
);

import { generateRoutes } from "@/utils/genarateRoute";
import { publicRoutes } from "./publicRoutes";
import { customerRoutes } from "./customerRoutes";
import PersonalInfoPage from "@/pages/Dashboard/Customer/PersonalInfoPage";
import NotFound from "@/components/shared/NotFound";
import ResetPassword from "@/components/auth/ResetPassword";
import PageLoader from "@/components/shared/PageLoader";
import { withAuth } from "@/utils/withAuth";
import { Role } from "@/types";
import ViewProfilePage from "@/pages/Dashboard/Customer/ViewProfilePage";
import PaymentCancel from "@/pages/payment/PaymentCancel";
import PaymentSuccess from "@/pages/payment/PaymentSuccess";

const CustomerProtectedRoutes = withAuth(
  () => (
    <Suspense fallback={<PageLoader />}>
      <LazyCustomerDashboard></LazyCustomerDashboard>
    </Suspense>
  ),
  Role.customer,
);

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
  // customer dashboard routes
  {
    path: "customer-dashboard",
    element: <CustomerProtectedRoutes />,
    children: [
      {
        index: true,
        element: <ViewProfilePage></ViewProfilePage>,
      },

      {
        path: "edit-profile",
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
  // ============================ payment ============
  {
    path: "/payment-cancel",
    Component: PaymentCancel,
  },
  {
    path: "/payment-success",
    Component: PaymentSuccess,
  },
  // {
  //   path: "payment-success",
  //   Component: PaymentSuccess,
  // },
  // page handler routes
  {
    path: "*",
    Component: NotFound,
  },
]);

export default router;
