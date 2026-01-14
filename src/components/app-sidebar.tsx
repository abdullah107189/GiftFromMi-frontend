import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { sellerSideBar } from "./Dashboard/Seller/SellerSideBar";
import logo from "@/assets/icons/logo2.png";
import { useLocation } from "react-router";
import { cn } from "@/lib/utils";
import { SetupProgress } from "./Dashboard/Seller/SetupProgress";

export function AppSidebar() {
  const { pathname } = useLocation();

  return (
    <Sidebar className="border-none">
      {/* Sidebar Header with Logo */}
      <SidebarHeader className="bg-primary-800 xl:p-8 md:p-6 p-4">
        <div className="flex items-center gap-3">
          <img src={logo} alt="GiftFromMi" className="h-15 w-auto" />
          <span className="text-white text-xl font-semibold">
            GiftFromMi
          </span>
        </div>
      </SidebarHeader>

      {/* Sidebar Menu Items */}
      <SidebarContent className="bg-[#6D4C25] px-4 pt-8">
        <SidebarMenu className="gap-2">
          {sellerSideBar.map((item) => {
            const isActive = pathname === item.url;
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  className={cn(
                    "flex items-center gap-3 px-4 py-6 text-white transition-all duration-200 rounded-xl",
                    isActive
                      ? "bg-[#C88628] hover:bg-[#C88628] hover:text-white"
                      : "hover:bg-white/10 hover:text-white"
                  )}
                >
                  <a href={item.url}>
                    <item.icon
                      className={cn(
                        "size-5",
                        isActive ? "text-white" : "text-white/80"
                      )}
                    />
                    <span className="text-lg font-medium">{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      {/* Sidebar Footer with Setup Progress */}
      <SidebarFooter className="bg-[#6D4C25] p-6 pb-10">
        <SetupProgress percentage={30} />
      </SidebarFooter>
    </Sidebar>
  );
}
