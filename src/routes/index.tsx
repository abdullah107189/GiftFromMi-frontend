import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";
import App from "@/App";

const HomePage = lazy(() => import("@/pages/HomePage"));
const LoginPage = lazy(() => import("@/pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/auth/RegisterPage"));
const ForgotPassword = lazy(() => import("@/components/auth/ForgotPassword"));
const OTPVerification = lazy(() => import("@/components/auth/OTPVerification"));

const LazyCustomerDashboard = lazy(
  () => import("@/components/layout/CustomerDashboard"),
);

import { generateRoutes } from "@/utils/genarateRoute";
import { publicRoutes } from "./publicRoutes";
import { customerRoutes } from "./customerRoutes";
import PageLoader from "@/components/shared/PageLoader";
import { withAuth } from "@/utils/withAuth";
import { Role } from "@/types";
const PersonalInfoPage = lazy(
  () => import("@/pages/Dashboard/Customer/PersonalInfoPage"),
);
const UpdateProfilePage = lazy(
  () => import("@/pages/Dashboard/Customer/UpdateProfilePage"),
);
const NotFound = lazy(() => import("@/components/shared/NotFound"));
const ResetPassword = lazy(() => import("@/components/auth/ResetPassword"));
const PaymentCancel = lazy(() => import("@/pages/payment/PaymentCancel"));
const PaymentSuccess = lazy(() => import("@/pages/payment/PaymentSuccess"));

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
        element: (
          <Suspense fallback={<PageLoader />}>
            <PersonalInfoPage />
          </Suspense>
        ),
      },

      {
        path: "update-profile",
        element: (
          <Suspense fallback={<PageLoader />}>
            <UpdateProfilePage />
          </Suspense>
        ),
      },

      ...generateRoutes(customerRoutes),
    ],
  },

  // auth part routes
  {
    path: "/login",
    element: (
      <Suspense fallback={<PageLoader />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "/register",
    element: (
      <Suspense fallback={<PageLoader />}>
        <RegisterPage />
      </Suspense>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <Suspense fallback={<PageLoader />}>
        <ForgotPassword />
      </Suspense>
    ),
  },
  {
    path: "/otp",
    element: (
      <Suspense fallback={<PageLoader />}>
        <OTPVerification />
      </Suspense>
    ),
  },
  {
    path: "/reset-password",
    element: (
      <Suspense fallback={<PageLoader />}>
        <ResetPassword />
      </Suspense>
    ),
  },
  // ============================ payment ============
  {
    path: "/payment-cancel",
    element: (
      <Suspense fallback={<PageLoader />}>
        <PaymentCancel />
      </Suspense>
    ),
  },
  {
    path: "/payment-success",
    element: (
      <Suspense fallback={<PageLoader />}>
        <PaymentSuccess />
      </Suspense>
    ),
  },
  // {
  //   path: "payment-success",
  //   Component: PaymentSuccess,
  // },
  // page handler routes
  {
    path: "*",
    element: (
      <Suspense fallback={<PageLoader />}>
        <NotFound />
      </Suspense>
    ),
  },
]);

export default router;
