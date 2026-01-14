import { Search, Bell, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const DashboardHeader = () => {
  return (
    <header className="flex h-20 items-center justify-between px-8 bg-white border-b w-full">
      {/* Search Bar */}
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
        <Input
          placeholder="Search orders, recipients"
          className="pl-10 bg-white border-gray-200 rounded-lg h-11 focus-visible:ring-1 focus-visible:ring-[#C88628]"
        />
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-6">
        <Button className="bg-[#C88628] hover:bg-[#b07522] text-white px-6 h-11 rounded-xl flex gap-2 font-medium">
          <Plus className="size-5" />
          New Order
        </Button>

        <div className="relative cursor-pointer">
          <Bell className="size-6 text-gray-600" />
          <span className="absolute -top-1 -right-1 size-4 bg-[#C88628] border-2 border-white rounded-full flex items-center justify-center text-[10px] text-white font-bold">
            2
          </span>
        </div>

        <div className="flex items-center gap-3 pl-2 cursor-pointer">
          <Avatar className="size-10">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <span className="font-semibold text-gray-800 text-sm">John Doe</span>
        </div>
      </div>
    </header>
  );
};
