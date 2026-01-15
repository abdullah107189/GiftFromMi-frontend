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
  () => import("@/components/shop-gifts/ProductDetails/ProductDetails")
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
import Logout from "@/pages/Dashboard/Seller/Logout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <div className="p-10 text-center">Something went wrong.</div>,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "how-it-works",
        element: (
          <Suspense fallback={<PageLoader />}>
            <HowItWorksPage />
          </Suspense>
        ),
      },
      {
        path: "shop-gifts",
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<PageLoader />}>
                <ShopGiftsPage />
              </Suspense>
            ),
          },
          {
            path: ":id",
            element: (
              <Suspense fallback={<PageLoader />}>
                <ProductDetails />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "for-professionals",
        element: (
          <Suspense fallback={<PageLoader />}>
            <ForProfessionalsPage />
          </Suspense>
        ),
      },
      {
        path: "bulk-automation",
        element: (
          <Suspense fallback={<PageLoader />}>
            <BulkAutomationPage />
          </Suspense>
        ),
      },
      {
        path: "contact-us",
        element: (
          <Suspense fallback={<PageLoader />}>
            <ContactUsPage />
          </Suspense>
        ),
      },
      {
        path: "book-call",
        element: (
          <Suspense fallback={<PageLoader />}>
            <BookSetupCall />
          </Suspense>
        ),
      },
      {
        path: "shopping-cart",
        element: (
          <Suspense fallback={<PageLoader />}>
            <ShoppingCart />
          </Suspense>
        ),
      },
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
    path: "dashboard",
    element: (
      <PrivetRoute>
        <SellerDashboard></SellerDashboard>
      </PrivetRoute>
    ),
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
        element: <OrdersPage></OrdersPage>,
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
      {
        path: "logout",
        element: <Logout></Logout>,
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
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default router;
