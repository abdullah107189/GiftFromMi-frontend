import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { CustomerOrder } from "@/types/orders";
import { Link } from "react-router";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const formatLabel = (value: string) =>
  value.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

const hasDeliveryDate = (delivery?: string) =>
  Boolean(delivery) && delivery !== "-" && delivery !== "—";

export default function ReorderCard({ order }: { order: CustomerOrder }) {
  const orderDate = dateFormatter.format(new Date(order.created_at));
  const isBulkOrder = Boolean(Number(order.is_bulk));
  const totalUnits = order.items.reduce(
    (sum, item) => sum + (item.total_quantity ?? item.quantity ?? 0),
    0,
  );

  return (
    <div className="bg-white border border-gray-300 md:p-4 p-2 md:rounded-2xl rounded-xl">
      <div className="flex items-center justify-between xl:mb-8 lg:mb-6 md:mb-4 mb-2 flex-wrap gap-2">
        <div className="flex items-center md:gap-4 gap-2 flex-wrap">
          <span className="xl:text-xl lg:text-lg md:text-base text-sm font-medium text-gray-700">
            {order.order_id}
          </span>
          <span className="text-gray-700 xl:text-[18px] lg:text-lg md:text-base text-sm">
            {orderDate}
          </span>
          <Badge className="bg-[#2E8B571C] text-[#2E8B57] rounded-full xl:px-7 lg:px-6 md:px-4 px-2 xl:py-2 lg:py-1 md:py-1 py-1 border-none font-medium">
            {formatLabel(String(order.payment_status))}
          </Badge>
          <Badge className="bg-[#F5F5F6] text-gray-700 rounded-full xl:px-7 lg:px-6 md:px-4 px-2 xl:py-2 lg:py-1 md:py-1 py-1 border-none font-medium">
            {formatLabel(String(order.fulfillment_status))}
          </Badge>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-4 md:mb-6">
        <Badge className="bg-[#F8FAFC] text-gray-700 rounded-full px-4 py-2 border-none shadow-none">
          {isBulkOrder ? "Bulk Order" : "Single Order"}
        </Badge>
        <p className="text-sm text-gray-500">
          {isBulkOrder
            ? `${order.recipient_count ?? 0} recipients`
            : `${order.items.length} product${order.items.length === 1 ? "" : "s"}`}
        </p>
        <p className="text-sm text-gray-500">
          {totalUnits} total unit{totalUnits === 1 ? "" : "s"}
        </p>
        <p className="text-sm text-gray-500">
          Total: {currencyFormatter.format(order.total)}
        </p>
      </div>

      <div className="xl:space-y-8 lg:space-y-6 md:space-y-4 space-y-3">
        {order.items.map((item, index: number) => (
          <div key={`${order.id}-${item.id ?? index}`}>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center md:gap-5 gap-2 min-w-0">
                <div className="w-[100px] h-[102px] aspect-50/51 rounded-2xl overflow-hidden bg-gray-50">
                  <img
                    src={item.image}
                    alt={item.product_title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1 min-w-0">
                  <h4 className="xl:text-2xl lg:text-xl md:text-lg text-base font-medium text-gray-900 md:mb-6 mb-4">
                    {item.product_title}
                  </h4>
                  <p className="text-gray-900 font-normal font-manrope">
                    Category: {item.category}
                  </p>
                  <p className="text-gray-500 font-normal font-manrope">
                    Quantity: {item.total_quantity ?? item.quantity ?? 0}
                  </p>
                  <p className="text-gray-500 font-normal font-manrope">
                    Delivery:{" "}
                    {hasDeliveryDate(item.estimated_delivery)
                      ? item.estimated_delivery
                      : "Not available"}
                  </p>
                </div>
              </div>
            </div>

            {index !== order.items.length - 1 && (
              <div className="border-b border-gray-200 xl:mt-8 lg:mt-6 md:mt-4 mt-2" />
            )}
          </div>
        ))}
      </div>
      <div className="mt-3 gap-4 flex">
        <Button variant="outline" className="px-5 sm:px-6 rounded-2xl">
          Invoice
        </Button>
        <Link to={`/customer-dashboard/order-list/order-details/${order.id}`}>
          <Button variant="outline" className="px-5 sm:px-6 rounded-2xl">
            View All Details
          </Button>
        </Link>
      </div>
    </div>
  );
}
