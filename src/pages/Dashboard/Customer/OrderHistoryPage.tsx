import OrderHistoryHeader from "@/components/Dashboard/Customer/OrderHistory/OrderHistoryHeader";
import ReorderCard from "@/components/Dashboard/Customer/OrderHistory/ReorderCard";
import SEO from "@/components/shared/SEO";
import { customerOrders } from "@/data/customerOrders";
import { useState } from "react";

const OrderHistoryPage = () => {
  const [filter, setFilter] = useState("all");

  const historyOrders = [...customerOrders]
    .filter((order) => {
      if (filter === "paid") {
        return order.payment_status === "paid";
      }

      if (filter === "delivered") {
        return order.fulfillment_status === "delivered";
      }

      if (filter === "bulk") {
        return Boolean(Number(order.is_bulk));
      }

      return true;
    })
    .sort(
      (firstOrder, secondOrder) =>
        new Date(secondOrder.created_at).getTime() -
        new Date(firstOrder.created_at).getTime()
    );

  return (
    <div>
      <SEO
        title="Order History"
        description="Review your past orders and reorder your favorites."
      />
      <OrderHistoryHeader
        filter={filter}
        onFilterChange={setFilter}
        totalCount={historyOrders.length}
      />
      <div className="flex flex-col xl:gap-12 lg:gap-8 md:gap-6 gap-4 shadow-[0_6px_16px_0_rgba(0,0,0,0.12)] xl:rounded-4xl lg:rounded-3xl  rounded-2xl  xl:p-10 lg:p-6 md:p-4 p-2">
        {historyOrders.map((order) => (
          <ReorderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
