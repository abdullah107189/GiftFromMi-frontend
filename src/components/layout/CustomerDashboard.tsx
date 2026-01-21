import { Outlet } from "react-router";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { CustomerSidebar } from "../shared/DashbardSidebar/CustomerSidebar";
import ResponsiveNavbar from "../shared/navbar/Navbar";
import Footer from "@/components/shared/footer/Footer";

function CustomerDashboard() {
  return (
    <div className="max-w-main mx-auto ">
      <ResponsiveNavbar />
      <SidebarProvider className="md:mt-36 mt-15 max-w-container mx-auto px-3">
        <CustomerSidebar className="sticky md:top-37 top-15 xl:w[400px] lg:w-[300px] md:w-[250px] w-[200px]" />
        <main className="w-full  xl:px-6 p-4 ">
          <SidebarTrigger className="md:hidden w-10 ml-2 mt-2 rounded-lg bg-primary-50 text-primary" />
          <Outlet></Outlet>
        </main>
      </SidebarProvider>
      <Footer></Footer>
    </div>
  );
}

export default CustomerDashboard;
