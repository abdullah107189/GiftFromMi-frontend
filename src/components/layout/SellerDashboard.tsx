import { Outlet } from "react-router";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { DashboardHeader } from "../Dashboard/Seller/DashboardHeader";
import { SellerSidebar } from "../shared/DashbardSidebar/SellerSidebar";

function SellerDashboard() {
  return (
    <div className="max-w-main mx-auto bg-gray-50">
      <SidebarProvider>
        <SellerSidebar />
        <main className="w-full xl:p-6 p-4 overflow-hidden">
          <SidebarTrigger className="md:hidden w-10 border ml-2 mt-2 rounded-lg bg-primary-50 text-primary" />
          {/* Header */}
          <DashboardHeader></DashboardHeader>
          <Outlet></Outlet>
        </main>
      </SidebarProvider>
    </div>
  );
}

export default SellerDashboard;
