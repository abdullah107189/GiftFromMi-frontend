import { Outlet } from "react-router";
// import { AppSidebar } from "../app-sidebar";
import { SidebarProvider } from "../ui/sidebar";

function CustomerDashboard() {
  return (
    <div className="max-w-main mx-auto bg-gray-50">
      <SidebarProvider>
        {/* <AppSidebar /> */}
        <main className="w-full xl:p-6 p-4 overflow-hidden">
          {/* <SidebarTrigger className="md:hidden w-10 border ml-2 mt-2 rounded-lg bg-primary-50 text-primary" /> */}
          <Outlet></Outlet>
        </main>
      </SidebarProvider>
    </div>
  );
}

export default CustomerDashboard;
