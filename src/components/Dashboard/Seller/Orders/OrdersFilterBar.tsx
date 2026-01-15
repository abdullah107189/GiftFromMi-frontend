"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SharedDropdown from "@/components/shared/SharedDropdown";

const tabs = [
  { label: "All Orders", value: "all" },
  { label: "Trending", value: "trending" },
  { label: "Scheduled", value: "scheduled" },
  { label: "Shipped", value: "shipped" },
  { label: "Delivered", value: "delivered" },
];

const statusOptions = [
  { label: "Pending", value: "pending" },
  { label: "Delivered", value: "delivered" },
  { label: "Shipped", value: "shipped" },
  { label: "Scheduled", value: "scheduled" },
];

export default function OrdersFilterBar() {
  const [selectedStatus, setSelectedStatus] = React.useState("all");

  return (
    <div className="w-full bg-white p-4 rounded-2xl border border-gray-200 mt-4">
      <div className="flex xl:flex-row flex-col gap-3 xl:items-center justify-between ">
        {/* Shadcn Tabs - Left Side */}
        <Tabs defaultValue="all" className="w-auto overflow-auto">
          <TabsList className="bg-transparent xl:gap-9 lg:gap-5 gap-3 h-auto p-0">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className={cn(
                  "px-0 py-1 text-[14px] font-medium transition-all rounded-none border-b-2 border-transparent data-[state=active]:text-primary data-[state=active]:bg-transparent shadow-none! cursor-pointer",
                  "text-gray-500 hover:text-gray-700"
                )}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Right Side Controls */}
        <div className="flex items-center gap-3">
          {/* Search Input Section */}
          <div className="relative w-[256px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search orders"
              className="pl-10 h-10 bg-white border-gray-200 rounded-[10px] focus-visible:ring-[#CA8A32]  focus-visible:ring-1"
            />
          </div>

          {/* Filter Icon Button */}
          <Button
            variant="outline"
            size="icon"
            className="p-2! border border-gray-200 text-gray-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M6.66708 13.3333C6.66702 13.4572 6.70148 13.5787 6.7666 13.6841C6.83172 13.7895 6.92492 13.8746 7.03574 13.93L8.36908 14.5967C8.47074 14.6475 8.58371 14.6714 8.69724 14.6663C8.81077 14.6612 8.92111 14.6271 9.01776 14.5673C9.11442 14.5075 9.19419 14.424 9.24949 14.3247C9.30479 14.2254 9.3338 14.1137 9.33374 14V9.33333C9.33389 9.00292 9.45672 8.68433 9.67841 8.43933L14.4937 3.11333C14.5801 3.01771 14.6368 2.89912 14.6571 2.77192C14.6775 2.64472 14.6605 2.51435 14.6083 2.39658C14.5562 2.27881 14.471 2.17868 14.3631 2.1083C14.2552 2.03792 14.1292 2.0003 14.0004 2H2.00041C1.87148 2.00005 1.74533 2.03748 1.63724 2.10776C1.52915 2.17804 1.44376 2.27815 1.39141 2.39598C1.33906 2.5138 1.322 2.64427 1.34229 2.77159C1.36259 2.89892 1.41936 3.01762 1.50574 3.11333L6.32241 8.43933C6.5441 8.68433 6.66693 9.00292 6.66708 9.33333V13.3333Z"
                stroke="#101828"
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Button>

          {/* Status Dropdown */}
          <SharedDropdown
            options={statusOptions}
            selectedValue={selectedStatus}
            onValueChange={setSelectedStatus}
            placeholder="All Status"
            className="h-10 min-w-[130px] border-gray-200 text-gray-700"
          />
        </div>
      </div>
    </div>
  );
}
