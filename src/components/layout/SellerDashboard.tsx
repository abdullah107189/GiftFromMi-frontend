import { Outlet } from "react-router";
import { AppSidebar } from "../app-sidebar";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";

function SellerDashboard() {
  return (
    <div className="max-w-main mx-auto">
      <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
          <Outlet></Outlet>
        </main>
      </SidebarProvider>
    </div>
  );
}

export default SellerDashboard;
