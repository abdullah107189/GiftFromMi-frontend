import OrderCard from "@/components/Dashboard/Customer/MyOrders/OrderCard";
import SharedDropdown from "@/components/shared/SharedDropdown";
import { useState } from "react";
import SEO from "@/components/shared/SEO";
import { customerOrdersResponse } from "@/data/customerOrders";

export function OrderListPage() {
  const [filter, setFilter] = useState("all");
  const options = [
    { label: "All", value: "all" },
    { label: "Newest First", value: "newest_first" },
    { label: "Oldest First", value: "oldest_first" },
    { label: "Paid Only", value: "paid_only" },
    { label: "Pending Only", value: "pending_only" },
    { label: "Bulk Orders", value: "bulk_only" },
  ];

  const displayedOrders = [...customerOrdersResponse.data]
    .filter((order) => {
      if (filter === "paid_only") {
        return order.payment_status === "paid";
      }

      if (filter === "pending_only") {
        return (
          order.fulfillment_status === "pending" ||
          order.payment_status === "pending"
        );
      }

      if (filter === "bulk_only") {
        return Boolean(Number(order.is_bulk));
      }

      return true;
    })
    .sort((firstOrder, secondOrder) => {
      const firstTime = new Date(firstOrder.created_at).getTime();
      const secondTime = new Date(secondOrder.created_at).getTime();

      if (filter === "oldest_first") {
        return firstTime - secondTime;
      }

      return secondTime - firstTime;
    });

  return (
    <div className="">
      <SEO
        title="My Orders"
        description="View and track your current active orders."
      />
      <div className="flex justify-between items-center mb-8">
        <h2 className="md:text-2xl text-xl font-semibold text-gray-900">
          Orders ({displayedOrders.length})
        </h2>

        <div className="flex items-center gap-2">
          <h2 className=" text-gray-900">Sort by:</h2>
          <SharedDropdown
            options={options}
            selectedValue={filter}
            onValueChange={(val) => setFilter(val)}
            className="bg-[#F5F5F6] border-none px-4 py-1 h-10 w-[150px]"
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto xl:p-10 lg:p-8 md:p-6 p-4 bg-white shadow-[0_6px_16px_0_rgba(0,0,0,0.12)] rounded-4xl overflow-hidden">
        {displayedOrders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}
