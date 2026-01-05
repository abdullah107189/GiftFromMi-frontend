import App from "@/App";
import BulkAutomationPage from "@/pages/BulkAutomationPage";
import ContactUsPage from "@/pages/ContactUsPage";
import HomePage from "@/pages/HomePage";
import HowItWorksPage from "@/pages/HowItWorksPage";
import ProfessionalsPage from "@/pages/ProfessionalsPage";
import ShopGiftsPage from "@/pages/ShopGiftsPage";
import { createBrowserRouter } from "react-router";
const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/",
        Component: HomePage,
      },
      {
        path: "/how-it-works",
        Component: HowItWorksPage,
      },
      {
        path: "/shop-gifts",
        Component: ShopGiftsPage,
      },
      {
        path: "/for-professionals",
        Component: ProfessionalsPage,
      },
      {
        path: "/bulk-automation",
        Component: BulkAutomationPage,
      },
      {
        path: "/contact-us",
        Component: ContactUsPage,
      },
    ],
  },
]);

export default router;
