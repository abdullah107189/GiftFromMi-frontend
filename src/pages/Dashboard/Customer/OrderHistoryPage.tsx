import OrderHistoryHeader from "@/components/Dashboard/Customer/OrderHistory/OrderHistoryHeader";
import ReorderCard from "@/components/Dashboard/Customer/OrderHistory/ReorderCard";
import SEO from "@/components/shared/SEO";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PackageSearch, ShoppingBag } from "lucide-react";
import { Link } from "react-router";
import { useGetAllOrderQuery } from "@/redux/features/order/order.api";
import PageLoader from "@/components/shared/PageLoader";

const OrderHistoryPage = () => {
  const [filter, setFilter] = useState("all");
  const { data: customerOrders = [], isLoading } =
    useGetAllOrderQuery(undefined);

  if (isLoading) {
    return <PageLoader />;
  }

  const historyOrders = customerOrders
    .filter((order) => order.fulfillment_status === "delivered")
    .filter((order) => {
      if (filter === "paid") {
        return order.payment_status === "paid";
      }

      if (filter === "bulk") {
        return Boolean(Number(order.is_bulk));
      }

      return true;
    })
    .sort(
      (firstOrder, secondOrder) =>
        new Date(secondOrder.created_at).getTime() -
        new Date(firstOrder.created_at).getTime(),
    );

  const emptyStateCopy = {
    all: {
      title: "No delivered orders yet",
      description:
        "Delivered orders will appear here once your current orders are completed.",
    },
    paid: {
      title: "No paid delivered orders found",
      description:
        "When a paid order is delivered, you will be able to reorder it from here.",
    },
    bulk: {
      title: "No delivered bulk orders found",
      description:
        "Your completed bulk gift campaigns will show up here for quick reordering.",
    },
  }[filter] ?? {
    title: "No order history found",
    description: "Your delivered orders will appear here.",
  };

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
      {historyOrders.length === 0 ? (
        <div className="relative overflow-hidden shadow-[0_6px_16px_0_rgba(0,0,0,0.12)] xl:rounded-4xl lg:rounded-3xl rounded-2xl xl:p-10 lg:p-6 md:p-5 p-4 bg-[radial-gradient(circle_at_top,rgba(202,138,50,0.14),transparent_38%),linear-gradient(180deg,#FFFFFF_0%,#FFF9F1_100%)] border border-[#F3E5CC]">
          <div className="mx-auto max-w-2xl text-center py-8 md:py-12">
            <div className="mx-auto mb-6 flex h-18 w-18 md:h-20 md:w-20 items-center justify-center rounded-[28px] bg-white shadow-[0_16px_40px_rgba(202,138,50,0.16)] ring-1 ring-[#E8D7B8]">
              <PackageSearch className="h-9 w-9 text-[#CA8A32]" />
            </div>
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-900">
              {emptyStateCopy.title}
            </h3>
            <p className="mt-3 text-sm md:text-base text-[#64748B] max-w-xl mx-auto">
              {emptyStateCopy.description}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to={"/customer-dashboard/order-list"}>
                <Button variant="secondary" className="rounded-2xl">
                  <ShoppingBag className="h-4 w-4" />
                  View Order List
                </Button>
              </Link>
              <Link to={"/shop-gifts"}>
                <Button variant="outline" className="rounded-2xl">
                  Shop Gifts
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col xl:gap-12 lg:gap-8 md:gap-6 gap-4 shadow-[0_6px_16px_0_rgba(0,0,0,0.12)] xl:rounded-4xl lg:rounded-3xl  rounded-2xl  xl:p-10 lg:p-6 md:p-4 p-2">
          {historyOrders.map((order) => (
            <ReorderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;
