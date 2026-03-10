import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { CustomerOrder } from "@/types/orders";
import { Link } from "react-router";

interface OrderCardProps {
  order: CustomerOrder;
}

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const formatLabel = (value: string) =>
  value.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

const getFulfillmentStatusClass = (status: string) => {
  switch (status) {
    case "delivered":
      return "bg-primary-200 text-primary";
    case "processing":
      return "bg-[#E6F0FF] text-[#155DFC]";
    case "cancelled":
      return "bg-[#FFF1F3] text-[#F43F5E]";
    default:
      return "bg-[#FEF9C2] text-[#A65F00]";
  }
};

const getPaymentStatusClass = (status: string) => {
  switch (status) {
    case "paid":
      return "bg-[#DCFCE7] text-[#008236]";
    case "failed":
      return "bg-[#FFF1F3] text-[#F43F5E]";
    case "refunded":
      return "bg-[#F3F4F6] text-[#364153]";
    default:
      return "bg-[#FEF3C7] text-[#B45309]";
  }
};

const hasDeliveryDate = (delivery?: string) =>
  Boolean(delivery) && delivery !== "-" && delivery !== "—";

export default function OrderCard({ order }: OrderCardProps) {
  const isBulkOrder = Boolean(Number(order.is_bulk));
  const placedOn = dateFormatter.format(new Date(order.created_at));
  const fulfillmentStatus = String(order.fulfillment_status).toLowerCase();
  const paymentStatus = String(order.payment_status).toLowerCase();
  const previewItems = order.items.slice(0, 4);
  const hiddenItemsCount = Math.max(
    order.items.length - previewItems.length,
    0,
  );
  const totalUnits = order.items.reduce(
    (sum, item) => sum + (item.total_quantity ?? item.quantity ?? 0),
    0,
  );

  const firstDeliveryDate = order.items.find((item) =>
    hasDeliveryDate(item.estimated_delivery),
  )?.estimated_delivery;

  const deliveryLabel = firstDeliveryDate || "Not available";
  const canTrack = fulfillmentStatus === "processing";
  const canReview = fulfillmentStatus === "delivered";
  const canCancel =
    fulfillmentStatus === "pending" || fulfillmentStatus === "processing";

  return (
    <div className="rounded-t-4xl overflow-hidden mb-8 overflow-x-auto!">
      <div className="bg-[#CA8A32] md:p-6 p-4 text-white">
        <table className="w-full border-collapse md:table xl:hidden">
          <tbody>
            <tr className="align-top">
              <td className="pr-4 pb-4">
                <div className="space-y-2">
                  <p className="font-medium">Order ID</p>
                  <p className="font-semibold text-xl">{order.order_id}</p>
                </div>
              </td>
              <td className="pl-4 pb-4 border-l border-white/20">
                <div className="space-y-1">
                  <p className="font-medium">Total Payment</p>
                  <p className="font-semibold text-xl">
                    {currencyFormatter.format(order.total)}
                  </p>
                </div>
              </td>
            </tr>

            <tr className="align-top">
              <td className="pr-4">
                <div className="space-y-1">
                  <p className="font-medium">Payment Method</p>
                  <p className="font-semibold text-xl">
                    {order.payment_method}
                  </p>
                </div>
              </td>
              <td className="pl-4 border-l border-white/20">
                <div className="space-y-1">
                  <p className="font-medium">Placed On</p>
                  <p className="font-semibold text-xl">{placedOn}</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <table className="w-full border-collapse hidden xl:table">
          <tbody>
            <tr className="align-top">
              <td className="pr-4">
                <div className="space-y-2">
                  <p className="font-medium">Order ID</p>
                  <p className="font-semibold md:text-2xl text-xl">
                    {order.order_id}
                  </p>
                </div>
              </td>

              <td className="pl-4 border-l border-white/20">
                <div className="space-y-1">
                  <p className="font-medium">Total Payment</p>
                  <p className="font-semibold md:text-2xl text-xl">
                    {currencyFormatter.format(order.total)}
                  </p>
                </div>
              </td>

              <td className="pl-4 border-l border-white/20">
                <div className="space-y-1">
                  <p className="font-medium">Payment Method</p>
                  <p className="font-semibold md:text-2xl text-xl">
                    {order.payment_method}
                  </p>
                </div>
              </td>

              <td className="pl-4 border-l border-white/20">
                <div className="space-y-1">
                  <p className="font-medium">Placed On</p>
                  <p className="font-semibold md:text-2xl text-xl">
                    {placedOn}
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="py-4 md:py-6 space-y-4 md:space-y-6 border border-gray-200 p-2 rounded-b-3xl">
        <div className="flex flex-wrap items-center gap-3">
          <Badge className="bg-[#F5F5F6] text-gray-900 border-none rounded-full px-4 py-2 shadow-none">
            {isBulkOrder ? "Bulk Order" : "Single Order"}
          </Badge>
          <p className="text-gray-500 font-normal text-sm sm:text-base">
            {isBulkOrder
              ? `${order.recipient_count ?? 0} recipients • ${totalUnits} total units`
              : `${totalUnits} item${totalUnits === 1 ? "" : "s"} in this order`}
          </p>
          <p className="text-gray-500 font-normal text-sm sm:text-base">
            Estimated delivery: {deliveryLabel}
          </p>
        </div>

        {previewItems.map((item, idx) => (
          <div
            key={`${order.id}-${item.id ?? idx}`}
            className="flex items-center gap-3 md:gap-4 border-b border-gray-200 pb-4 md:pb-5"
          >
            <img
              src={item.image}
              alt={item.product_title}
              className="
                w-[90px] h-[92px]
                sm:w-[110px] sm:h-[113px]
                lg:w-[130px] lg:h-[133px]
                xl:w-[150px] xl:h-[153px]
                rounded-xl object-cover
              "
            />

            <div className="space-y-1 min-w-0">
              <h4 className="font-medium text-gray-900 text-lg sm:text-xl md:text-2xl md:mb-5 mb-3 truncate">
                {item.product_title}
              </h4>
              <p className="text-gray-900 font-manrope text-sm sm:text-base">
                Category: {item.category}
              </p>
              <p className="text-gray-500 font-manrope text-sm sm:text-base">
                {isBulkOrder
                  ? `Quantity: ${item.total_quantity ?? 0} for ${
                      order.recipient_count ?? 0
                    } recipients`
                  : `Quantity: ${item.quantity ?? 0}${
                      item.sell_price
                        ? ` • Unit price: ${currencyFormatter.format(
                            item.sell_price,
                          )}`
                        : ""
                    }`}
              </p>
              <p className="text-gray-500 font-manrope text-sm sm:text-base">
                Delivery:{" "}
                {hasDeliveryDate(item.estimated_delivery)
                  ? item.estimated_delivery
                  : "Not available"}
              </p>
            </div>
          </div>
        ))}

        {hiddenItemsCount > 0 && (
          <p className="text-sm text-gray-500">
            +{hiddenItemsCount} more item{hiddenItemsCount === 1 ? "" : "s"} in
            this order
          </p>
        )}

        <div className="flex flex-col justify-between gap-4 md:gap-6 pt-4 ">
          <div className="flex flex-wrap items-center gap-3">
            <Badge
              className={`px-4 py-2 rounded-full font-medium text-sm shadow-none ${getFulfillmentStatusClass(
                fulfillmentStatus,
              )}`}
            >
              {formatLabel(fulfillmentStatus)}
            </Badge>
            <Badge
              className={`px-4 py-2 rounded-full font-medium text-sm shadow-none ${getPaymentStatusClass(
                paymentStatus,
              )}`}
            >
              Payment: {formatLabel(paymentStatus)}
            </Badge>

            <p className="text-gray-500 font-normal text-sm sm:text-base">
              Order placed on {placedOn}
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
            <div className="gap-3 md:gap-4 flex flex-wrap">
              {canTrack && (
                <>
                  <Button
                    className="px-5 sm:px-6 py-3 sm:py-4 h-auto rounded-2xl"
                    variant={"secondary"}
                  >
                    Track Order
                  </Button>
                  <Button
                    variant="outline"
                    className="px-5 sm:px-6 rounded-2xl"
                  >
                    Invoice
                  </Button>
                </>
              )}

              {canReview && (
                <>
                  <Button
                    className="h-auto px-5 sm:px-6 py-3 sm:py-4 rounded-2xl"
                    variant={"secondary"}
                  >
                    Add Review
                  </Button>
                  <Button
                    variant="outline"
                    className="px-5 sm:px-6 rounded-2xl"
                  >
                    Invoice
                  </Button>
                </>
              )}

              {fulfillmentStatus === "pending" && (
                <>
                  <Button
                    className="px-5 sm:px-6 py-3 sm:py-4 h-auto rounded-2xl"
                    variant={"secondary"}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="outline"
                    className="px-5 sm:px-6 rounded-2xl"
                  >
                    Invoice
                  </Button>
                </>
              )}
              <Link
                to={`/customer-dashboard/order-list/order-details/${order.id}`}
              >
                <Button variant="outline" className="px-5 sm:px-6 rounded-2xl">
                  View All Details
                </Button>
              </Link>
            </div>

            {canCancel && order.payment_status === "pending" && (
              <Button
                variant="ghost"
                className="
                  bg-[#FFF1F3] h-auto py-3 sm:py-4
                  text-[#F43F5E] hover:bg-[#FFE4E8] hover:text-[#E11D48]
                  rounded-xl px-6 sm:px-7 text-sm font-medium transition-all
                  md:ml-4
                  w-full md:w-auto
                "
              >
                Cancel Order
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
