import { lazy } from "react";
import type { ISidebarItem } from "@/types";
import ShopGiftsPage from "@/pages/ShopGiftsPage";

const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const HowItWorksPage = lazy(() => import("@/pages/HowItWorksPage"));
const ForProfessionalsPage = lazy(() => import("@/pages/ForProfessionalsPage"));
const BulkAutomationPage = lazy(() => import("@/pages/BulkAutomationPage"));
const ContactUsPage = lazy(() => import("@/pages/ContactUsPage"));
const BookSetupCall = lazy(() => import("@/pages/BookSetupCall"));
const CheckoutPage = lazy(() => import("@/pages/CheckoutPage"));
const ShoppingCart = lazy(() =>
  import("@/pages/ShoppingCart").then((module) => ({
    default: module.ShoppingCart,
  })),
);
const ProductDetails = lazy(
  () => import("@/components/shop-gifts/ProductDetails/ProductDetails"),
);
const CategoryProductsPage = lazy(() => import("@/pages/CategoryProductsPage"));

export const publicRoutes: ISidebarItem[] = [
  {
    title: "How It Works",
    url: "/how-it-works",
    component: HowItWorksPage,
  },
  {
    title: "Shop Gifts",
    url: "/shop-gifts",
    component: ShopGiftsPage,
  },
  {
    title: "Gift Details",
    url: "/shop-gifts/:id",
    component: ProductDetails,
    hidden: true,
  },
  {
    title: "Category Products",
    url: "/shop-gifts/category/:categoryId",
    component: CategoryProductsPage,
    hidden: true,
  },
  {
    title: "For Professionals",
    url: "/for-professionals",
    component: ForProfessionalsPage,
  },
  {
    title: "Bulk Automation",
    url: "/bulk-automation",
    component: BulkAutomationPage,
  },
  {
    title: "Contact Us",
    url: "/contact-us",
    component: ContactUsPage,
  },
  {
    title: "Book A Call",
    url: "/book-call",
    component: BookSetupCall,
  },
  {
    title: "Shopping Cart",
    url: "/shopping-cart",
    component: ShoppingCart,
  },
  {
    title: "Checkout",
    url: "/checkout",
    component: CheckoutPage,
  },
  {
    title: "Privacy Policy",
    url: "/privacy_policy",
    component: PrivacyPolicy,
  },
];
