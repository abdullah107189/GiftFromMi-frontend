import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { sellerSideBar } from "./Dashboard/Seller/SellerSideBar";
import logo from "@/assets/icons/logo2.png";
import { Link, useLocation } from "react-router";
import { cn } from "@/lib/utils";
import { SetupProgress } from "./Dashboard/Seller/SetupProgress";

export function AppSidebar() {
  const { pathname } = useLocation();

  return (
    <Sidebar className="border-none! xl:w-87.5 md:w-70 sticky top-0">
      {/* Sidebar Header with Logo */}
      <SidebarHeader className="bg-primary-800 xl:p-8 md:p-6 p-4 ">
        <Link to={"/"} className="flex items-center gap-3">
          <img src={logo} alt="GiftFromMi" className="h-15 w-auto" />
          <span className="text-white text-xl font-semibold">GiftFromMi</span>
        </Link>
      </SidebarHeader>

      {/* Sidebar Menu Items */}
      <SidebarContent className="bg-primary-800 xl:pt-8 md:pt-6 pt-4 xl:px-8 md:px-6 px-4 ">
        <SidebarMenu className="xl:gap-6 md:gap-4 gap-2">
          {sellerSideBar.map((item) => {
            const isActive = pathname === item.url;
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  className={cn(
                    "flex items-center justify-start gap-3 px-3 py-4 xl:h-10 text-white transition-all duration-200 rounded-[10px]",
                    isActive
                      ? "bg-primary hover:bg-[#C88628] hover:text-white"
                      : "hover:bg-white/10 hover:text-white"
                  )}
                >
                  <Link to={item.url}>
                    <item.icon
                      className={cn(
                        "size-5",
                        isActive ? "text-white" : "text-white/80"
                      )}
                    />
                    <span className="font-medium">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
          <SetupProgress
            className="xl:mt-25 md:mt-20 mt-12.5 mb-6"
            percentage={30}
          />
        </SidebarMenu>
      </SidebarContent>

      {/* Sidebar Footer with Setup Progress */}
    </Sidebar>
  );
}
