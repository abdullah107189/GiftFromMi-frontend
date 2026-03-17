import { Outlet, ScrollRestoration } from "react-router";
import Navbar from "../shared/navbar/Navbar";
import Footer from "../shared/footer/Footer";
import CartSyncManager from "../shared/CartSyncManager";
import { useSettingsQuery } from "@/redux/features/public/public.api";

function MainLayout() {
  useSettingsQuery(undefined);
  return (
    <div className="max-w-main mx-auto ">
      <CartSyncManager />
      <Navbar></Navbar>
      <ScrollRestoration />
      <div className="min-h-[calc(100vh-300px)]">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default MainLayout;
