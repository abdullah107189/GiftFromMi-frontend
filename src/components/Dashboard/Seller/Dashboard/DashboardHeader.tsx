import { Bell, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import p1 from "@/assets/person/p1.jpg";
export const DashboardHeader = () => {
  return (
    <header className="flex h-20 items-center justify-between px-4 xl:px-0 gap-5">
      {/* Search Bar */}
      <div className="relative w-full max-w-xs md:max-w-sm lg:max-w-md xl:w-xl">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M17.4995 17.4995L13.8828 13.8828"
              stroke="#6A7282"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z"
              stroke="#6A7282"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>

        <Input
          placeholder="Search orders, recipients"
          className="pl-10 bg-white border-gray-200 rounded-xl h-11 xl:h-12 focus-visible:ring-1 focus-visible:ring-[#C88628]"
        />
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-3 md:gap-4 lg:gap-6">
        {/* New Order Button */}
        <Button className="bg-primary hover:bg-[#b07522] text-white px-3 md:px-4 xl:px-6 h-10 xl:h-11 flex gap-2 font-medium">
          <Plus className="size-4 xl:size-5" />
          <span className="hidden md:inline">New Order</span>
        </Button>

        {/* Notification */}
        <div className="relative cursor-pointer">
          <Bell className="size-5 xl:size-6 text-gray-900" />
          <span className="absolute -top-1 -right-1 size-4 bg-[#FF6900] border-2 border-white rounded-full flex items-center justify-center text-[10px] text-white font-bold">
            2
          </span>
        </div>

        {/* User */}
        <div className="flex items-center gap-2 xl:gap-3 pl-1 cursor-pointer">
          <Avatar className="size-9 xl:size-10">
            <AvatarImage src={p1} className="object-cover" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <span className="hidden lg:inline font-semibold text-gray-800 text-sm">
            John Doe
          </span>
        </div>
      </div>
    </header>
  );
};
