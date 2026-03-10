import { Link, useParams } from "react-router";
import {
  AlertCircle,
  ArrowLeft,
  CalendarDays,
  Mail,
  MapPin,
  Package2,
  Phone,
  ReceiptText,
  Users,
} from "lucide-react";
import SEO from "@/components/shared/SEO";
import DynamicBreadcrumb from "@/components/shared/DynamicBreadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PageLoader from "@/components/shared/PageLoader";
import { useGetSingleOrderQuery } from "@/redux/features/order/order.api";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const formatLabel = (value?: string) =>
  String(value ?? "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

const hasDeliveryDate = (delivery?: string) =>
  Boolean(delivery) && delivery !== "-" && delivery !== "—";

const getBadgeClass = (status?: string) => {
  switch (String(status).toLowerCase()) {
    case "delivered":
      return "bg-[#DCFCE7] text-[#008236]";
    case "processing":
      return "bg-[#E6F0FF] text-[#155DFC]";
    case "paid":
      return "bg-[#DCFCE7] text-[#008236]";
    case "cancelled":
    case "failed":
      return "bg-[#FFF1F3] text-[#F43F5E]";
    default:
      return "bg-[#FEF3C7] text-[#B45309]";
  }
};

const BackToOrdersButton = ({
  variant = "outline",
}: {
  variant?: "default" | "outline";
}) => (
  <Link to="/customer-dashboard/order-list">
    <Button variant={variant} className="rounded-2xl">
      <ArrowLeft className="h-4 w-4" />
      Back to Order List
    </Button>
  </Link>
);

export default function OrderDetailsPage() {
  const params = useParams();
  const orderId = Number(params.orderId);
  const shouldSkipQuery = Number.isNaN(orderId);

  const {
    data: detailsOrder,
    isLoading: isLoadingOrderDetails,
    isError: isOrderDetailsError,
  } = useGetSingleOrderQuery(orderId, {
    skip: shouldSkipQuery,
  });

  if (isLoadingOrderDetails) {
    return <PageLoader />;
  }

  if (shouldSkipQuery || isOrderDetailsError || !detailsOrder) {
    return (
      <div>
        <SEO title="Order Details" description="Review your order details." />
        <div className="mb-6">
          <DynamicBreadcrumb customLabel="Order Details" />
        </div>
        <div className="rounded-[32px] border border-[#F3E5CC] bg-[linear-gradient(180deg,#FFFFFF_0%,#FFF8EE_100%)] p-6 text-center shadow-[0_16px_40px_rgba(17,24,39,0.08)] md:p-8">
          <div className="mx-auto mb-5 flex h-[72px] w-[72px] items-center justify-center rounded-[24px] bg-white shadow-[0_16px_32px_rgba(202,138,50,0.14)]">
            <AlertCircle className="h-8 w-8 text-[#CA8A32]" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 md:text-3xl">
            Order details not available
          </h1>
          <p className="mt-3 text-sm text-[#64748B] md:text-base">
            We could not load this order right now. Please try again after the
            API responds with valid order detail data.
          </p>
          <div className="mt-8 flex justify-center">
            <BackToOrdersButton variant="default" />
          </div>
        </div>
      </div>
    );
  }

  const isBulkOrder = Boolean(Number(detailsOrder.is_bulk));
  const totalRecipients = detailsOrder.recipients?.length ?? 0;
  const totalItems =
    detailsOrder.recipients?.reduce(
      (sum, recipient) =>
        sum +
        recipient.items.reduce(
          (recipientSum, item) => recipientSum + item.quantity,
          0,
        ),
      0,
    ) ?? 0;

  return (
    <div className="space-y-6">
      <SEO
        title={`Order Details | ${detailsOrder.order_id}`}
        description="Review your order details, recipients, and item summary."
      />

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <DynamicBreadcrumb customLabel={detailsOrder.order_id} />
          <h1 className="mt-3 text-2xl font-semibold text-gray-900 md:text-3xl">
            Order Details
          </h1>
          <p className="mt-2 text-sm text-[#64748B] md:text-base">
            API-driven details view for your {isBulkOrder ? "bulk" : "single"}{" "}
            order.
          </p>
        </div>

        <BackToOrdersButton />
      </div>

      <section className="overflow-hidden rounded-[32px] shadow-[0_16px_40px_rgba(17,24,39,0.08)]">
        <div className="bg-[linear-gradient(96deg,#D0A15A_5.18%,#C57200_96.62%)] px-5 py-6 text-white md:px-8 md:py-8">
          <div className="flex gap-4 items-center justify-between">
            <div className="w-fit">
              <p className="text-sm text-white/80">Order ID</p>
              <h2 className="mt-2 text-xl font-semibold md:text-2xl">
                {detailsOrder.order_id}
              </h2>
            </div>

            <div className="w-fit">
              <p className="text-sm text-white/80">Estimated Delivery</p>
              <h2 className="mt-2 text-xl font-semibold md:text-2xl">
                {detailsOrder?.items?.[0]?.estimated_delivery ?? "N/A"}
              </h2>
            </div>

            <div className="w-fit">
              <p className="text-sm text-white/80">Total Payment</p>
              <h2 className="mt-2 text-xl font-semibold md:text-2xl">
                {currencyFormatter.format(detailsOrder.total)}
              </h2>
            </div>

            <div className="w-fit">
              <p className="text-sm text-white/80">Order Type</p>
              <h2 className="mt-2 text-xl font-semibold md:text-2xl">
                {isBulkOrder ? "Bulk Order" : "Single Order"}
              </h2>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 md:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <Badge
              className={`border-none px-4 py-2 shadow-none ${getBadgeClass(detailsOrder.fulfillment_status)}`}
            >
              {formatLabel(detailsOrder.fulfillment_status)}
            </Badge>
            <Badge
              className={`border-none px-4 py-2 shadow-none ${getBadgeClass(detailsOrder.payment_status)}`}
            >
              Payment: {formatLabel(detailsOrder.payment_status)}
            </Badge>
            <Badge className="border-none bg-[#F5F5F6] px-4 py-2 text-gray-700 shadow-none">
              {detailsOrder.payment_method ?? "Card"}
            </Badge>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-[24px] border border-[#EFE7DA] bg-[#FFF9F1] p-5">
              <div className="flex items-center gap-3 text-[#CA8A32]">
                <Users className="h-5 w-5" />
                <span className="text-sm font-medium">Recipients</span>
              </div>
              <p className="mt-4 text-3xl font-semibold text-gray-900">
                {totalRecipients}
              </p>
              <p className="mt-1 text-sm text-[#64748B]">
                {isBulkOrder
                  ? "Bulk delivery recipients"
                  : "Recipient attached to this order"}
              </p>
            </div>

            <div className="rounded-[24px] border border-[#EFE7DA] bg-[#FFF9F1] p-5">
              <div className="flex items-center gap-3 text-[#CA8A32]">
                <Package2 className="h-5 w-5" />
                <span className="text-sm font-medium">Total Units</span>
              </div>
              <p className="mt-4 text-3xl font-semibold text-gray-900">
                {totalItems}
              </p>
              <p className="mt-1 text-sm text-[#64748B]">
                Combined quantity across all recipients
              </p>
            </div>

            <div className="rounded-[24px] border border-[#EFE7DA] bg-[#FFF9F1] p-5">
              <div className="flex items-center gap-3 text-[#CA8A32]">
                <CalendarDays className="h-5 w-5" />
                <span className="text-sm font-medium">Delivery Window</span>
              </div>
              <p className="mt-4 text-3xl font-semibold text-gray-900">
                {detailsOrder.recipients?.some((recipient) =>
                  recipient.items.some((item) =>
                    hasDeliveryDate(item.estimated_delivery),
                  ),
                )
                  ? "Scheduled"
                  : "Pending"}
              </p>
              <p className="mt-1 text-sm text-[#64748B]">
                Recipient-specific delivery estimates from the API
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.5fr_0.9fr]">
        <div className="rounded-[32px] border border-gray-200 bg-white p-5 shadow-[0_16px_40px_rgba(17,24,39,0.06)] md:p-8">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 md:text-2xl">
                Recipient Breakdown
              </h2>
              <p className="text-sm text-[#64748B] md:text-base">
                Every recipient and item from the API response is rendered
                below.
              </p>
            </div>
            <Badge className="w-fit border-none bg-[#F5F5F6] px-4 py-2 text-gray-700 shadow-none">
              {isBulkOrder ? "Bulk dispatch view" : "Single delivery view"}
            </Badge>
          </div>

          <div className="mt-6 space-y-5">
            {detailsOrder.recipients?.map((recipient) => (
              <div
                key={recipient.id}
                className="rounded-[28px] border border-[#ECECEC] bg-[#FCFCFC] p-4 md:p-5"
              >
                <div className="flex flex-col gap-4 border-b border-dashed border-[#E5E7EB] pb-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 md:text-xl">
                      {recipient.name}
                    </h3>
                    <div className="mt-3 space-y-2 text-sm text-[#64748B]">
                      <p className="flex items-start gap-2">
                        <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#CA8A32]" />
                        <span className="break-all">{recipient.email}</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#CA8A32]" />
                        <span>{recipient.phone}</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#CA8A32]" />
                        <span>{recipient.full_address}</span>
                      </p>
                    </div>
                  </div>

                  <Badge className="w-fit border-none bg-white px-4 py-2 text-gray-700 shadow-none ring-1 ring-[#E5E7EB]">
                    {recipient.items.length} item
                    {recipient.items.length === 1 ? "" : "s"}
                  </Badge>
                </div>

                <div className="mt-4 space-y-4">
                  {recipient.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col gap-4 rounded-[24px] bg-white p-4 ring-1 ring-[#F0F0F0] sm:flex-row"
                    >
                      <div className="h-[110px] w-full shrink-0 overflow-hidden rounded-[20px] bg-[#F6F6F6] sm:w-[110px]">
                        <img
                          src={item.image}
                          alt={item.product_title}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h4 className="text-base font-semibold text-gray-900 md:text-lg">
                          {item.product_title}
                        </h4>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <Badge className="border-none bg-[#F5F5F6] px-3 py-1.5 text-gray-700 shadow-none">
                            {item.category}
                          </Badge>
                          <Badge className="border-none bg-[#F5F5F6] px-3 py-1.5 text-gray-700 shadow-none">
                            Qty: {item.quantity}
                          </Badge>
                          <Badge className="border-none bg-[#F5F5F6] px-3 py-1.5 text-gray-700 shadow-none">
                            {currencyFormatter.format(item.sell_price)}
                          </Badge>
                        </div>
                        <p className="mt-3 text-sm text-[#64748B]">
                          Estimated delivery:{" "}
                          {hasDeliveryDate(item.estimated_delivery)
                            ? item.estimated_delivery
                            : "Not available"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[32px] border border-gray-200 bg-white p-5 shadow-[0_16px_40px_rgba(17,24,39,0.06)] md:p-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Order Snapshot
            </h2>
            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#64748B]">Order total</span>
                <span className="font-semibold text-gray-900">
                  {currencyFormatter.format(detailsOrder.total)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#64748B]">Payment status</span>
                <span className="font-semibold text-gray-900">
                  {formatLabel(detailsOrder.payment_status)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#64748B]">Fulfillment</span>
                <span className="font-semibold text-gray-900">
                  {formatLabel(detailsOrder.fulfillment_status)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#64748B]">Recipients</span>
                <span className="font-semibold text-gray-900">
                  {totalRecipients}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#64748B]">Payment method</span>
                <span className="font-semibold text-gray-900">
                  {detailsOrder.payment_method ?? "Card"}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-[#F3E5CC] bg-[linear-gradient(180deg,#FFF8EE_0%,#FFFFFF_100%)] p-5 shadow-[0_16px_40px_rgba(202,138,50,0.08)] md:p-6">
            <div className="mb-3 flex items-center gap-3">
              <ReceiptText className="h-5 w-5 text-[#CA8A32]" />
              <h2 className="text-xl font-semibold text-gray-900">
                Live API Ready
              </h2>
            </div>
            <p className="text-sm leading-6 text-[#64748B]">
              This screen now renders directly from
              `useGetSingleOrderQuery(orderId)`. Later you only need to refine
              actions like invoice, cancel, or track.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Badge className="border-none bg-white px-3 py-1.5 text-gray-700 shadow-none ring-1 ring-[#E5E7EB]">
                API data
              </Badge>
              <Badge className="border-none bg-white px-3 py-1.5 text-gray-700 shadow-none ring-1 ring-[#E5E7EB]">
                Responsive layout
              </Badge>
              <Badge className="border-none bg-white px-3 py-1.5 text-gray-700 shadow-none ring-1 ring-[#E5E7EB]">
                Bulk + single order support
              </Badge>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
