import { Outlet } from "react-router";
import { AppSidebar } from "../app-sidebar";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";

function SellerDashboard() {
  return (
    <div className="max-w-main mx-auto">
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <SidebarTrigger className="md:hidden w-10 border ml-2 mt-2 rounded-lg bg-primary-50 text-primary" />
          <Outlet></Outlet>
        </main>
      </SidebarProvider>
    </div>
  );
}

export default SellerDashboard;
