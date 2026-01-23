import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { IProduct } from "@/types";

interface OrderCardProps {
  orderId: string;
  totalPayment: string;
  paymentMethod: string;
  deliveryDate: string;
  status: "accepted" | "delivered";
  items: IProduct[];
}

export default function OrderCard({
  orderId,
  totalPayment,
  paymentMethod,
  deliveryDate,
  status,
  items,
}: OrderCardProps) {
  const isAccepted = status === "accepted";
  const isDelivered = status === "delivered";

  return (
    <div className="rounded-t-4xl overflow-hidden mb-8 overflow-x-auto!">
      {/* ✅ XL stays same layout, add mobile/laptop stacking */}
      <div className="bg-[#CA8A32] md:p-6 p-4 text-white">
        {/* Mobile/Tablet: 2x2 table */}
        <table className="w-full border-collapse md:table xl:hidden">
          <tbody>
            <tr className="align-top">
              <td className="pr-4 pb-4">
                <div className="space-y-2">
                  <p className="font-medium">Order ID</p>
                  <p className="font-semibold text-xl">{orderId}</p>
                </div>
              </td>
              <td className="pl-4 pb-4 border-l border-white/20">
                <div className="space-y-1">
                  <p className="font-medium">Total Payment</p>
                  <p className="font-semibold text-xl">{totalPayment}</p>
                </div>
              </td>
            </tr>

            <tr className="align-top">
              <td className="pr-4">
                <div className="space-y-1">
                  <p className="font-medium">Payment Method</p>
                  <p className="font-semibold text-xl">{paymentMethod}</p>
                </div>
              </td>
              <td className="pl-4 border-l border-white/20">
                <div className="space-y-1">
                  <p className="font-medium">Estimated Delivery Date</p>
                  <p className="font-semibold text-xl">{deliveryDate}</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        {/* ✅ XL (Figma) : exactly same (your 4-col look) */}
        <table className="w-full border-collapse hidden xl:table">
          <tbody>
            <tr className="align-top">
              <td className="pr-4">
                <div className="space-y-2">
                  <p className="font-medium">Order ID</p>
                  <p className="font-semibold md:text-2xl text-xl">
                    {orderId}
                  </p>
                </div>
              </td>

              <td className="pl-4 border-l border-white/20">
                <div className="space-y-1">
                  <p className="font-medium">Total Payment</p>
                  <p className="font-semibold md:text-2xl text-xl">
                    {totalPayment}
                  </p>
                </div>
              </td>

              <td className="pl-4 border-l border-white/20">
                <div className="space-y-1">
                  <p className="font-medium">Payment Method</p>
                  <p className="font-semibold md:text-2xl text-xl">
                    {paymentMethod}
                  </p>
                </div>
              </td>

              <td className="pl-4 border-l border-white/20">
                <div className="space-y-1">
                  <p className="font-medium">Estimated Delivery Date</p>
                  <p className="font-semibold md:text-2xl text-xl">
                    {deliveryDate}
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ✅ Content padding: keep your xl feel, but allow smaller spacing on small screens */}
      <div className="py-4 md:py-6 space-y-4 md:space-y-6">
        {items.slice(0, 4).map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 md:gap-4 border-b border-gray-200 pb-4 md:pb-5"
          >
            {/* ✅ Image: keep XL sizes, shrink a bit on mobile */}
            <img
              src={item.image[0]}
              alt={item.title}
              className="
                w-[90px] h-[92px]
                sm:w-[110px] sm:h-[113px]
                lg:w-[130px] lg:h-[133px]
                xl:lg:w-[150px] xl:lg:h-[153px]
                rounded-xl object-cover
              "
            />

            <div className="space-y-1 min-w-0">
              {/* ✅ Title: XL keeps your 2xl; smaller screens reduce */}
              <h4 className="font-medium text-gray-900 text-lg sm:text-xl md:text-2xl md:mb-5 mb-3 truncate">
                {item.title}
              </h4>
              <p className="text-gray-900 font-manrope text-sm sm:text-base">
                Type: {item.category}
              </p>
            </div>
          </div>
        ))}

        {/* Footer Actions */}
        <div className="flex flex-col justify-between gap-4 md:gap-6 pt-4">
          {/* Status */}
          <div className="flex flex-wrap items-center gap-3">
            <Badge
              className={`px-4 py-2 rounded-full font-medium text-sm shadow-none ${
                isAccepted
                  ? "bg-primary-200 text-primary"
                  : "bg-primary-50 text-primary border border-primary"
              }`}
            >
              {status}
            </Badge>

            <p className="text-gray-500 font-normal text-sm sm:text-base">
              Your Order has been {status.toLowerCase()}
            </p>
          </div>

          {/* ✅ Buttons: mobile => stack / wrap nicely, XL keeps same look */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
            <div className="gap-3 md:gap-4 flex flex-wrap">
              {isAccepted && (
                <>
                  <Button
                    className="px-5 sm:px-6 py-3 sm:py-4 h-auto rounded-2xl"
                    variant={"secondary"}
                  >
                    Tracker Order
                  </Button>
                  <Button variant="outline" className="px-5 sm:px-6 rounded-2xl">
                    Invoice
                  </Button>
                </>
              )}

              {isDelivered && (
                <>
                  <Button
                    className="h-auto px-5 sm:px-6 py-3 sm:py-4 rounded-2xl"
                    variant={"secondary"}
                  >
                    Ad Review
                  </Button>
                  <Button variant="outline" className="px-5 sm:px-6 rounded-2xl">
                    Invoice
                  </Button>
                </>
              )}
            </div>

            {isAccepted && (
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
