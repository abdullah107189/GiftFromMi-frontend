import type { ISidebarItem } from "@/types";
import HowItWorksPage from "@/pages/HowItWorksPage";
import ShopGiftsPage from "@/pages/ShopGiftsPage";
import ForProfessionalsPage from "@/pages/ForProfessionalsPage";
import BulkAutomationPage from "@/pages/BulkAutomationPage";
import ContactUsPage from "@/pages/ContactUsPage";
import BookSetupCall from "@/pages/BookSetupCall";
import CheckoutPage from "@/pages/CheckoutPage";
import { ShoppingCart } from "@/pages/ShoppingCart";
import ProductDetails from "@/components/shop-gifts/ProductDetails/ProductDetails";

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
  
];
