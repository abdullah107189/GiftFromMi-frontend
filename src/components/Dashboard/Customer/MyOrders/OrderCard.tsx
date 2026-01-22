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
      {/* Order Info Header */}
      <div className="bg-[#CA8A32] md:p-6 p-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-white">
        <div className="space-y-2">
          <p className="font-medium">Order ID</p>
          <p className="font-semibold md:text-2xl text-xl">{orderId}</p>
        </div>
        <div className="space-y-1 border-l border-white/20 pl-4">
          <p className="font-medium">Total Payment</p>
          <p className="font-semibold md:text-2xl text-xl">{totalPayment}</p>
        </div>
        <div className="space-y-1 border-l border-white/20 pl-4">
          <p className="font-medium">Payment Method</p>
          <p className="font-semibold md:text-2xl text-xl">{paymentMethod}</p>
        </div>
        <div className="space-y-1 border-l border-white/20 pl-4">
          <p className="font-medium">Estimated Delivery Date</p>
          <p className="font-semibold md:text-2xl text-xl">{deliveryDate}</p>
        </div>
      </div>

      {/* Product Items List */}
      <div className="py-6 space-y-6">
        {items.slice(0, 4).map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 border-b border-gray-200 pb-5"
          >
            <img
              src={item.image[0]}
              alt={item.title}
              className="lg:w-[150px] lg:h-[153px] w-[120px] h-[123px] rounded-xl object-cover"
            />
            <div className="space-y-1">
              <h4 className="font-medium text-gray-900 text-2xl md:mb-5 mb-3">
                {item.title}
              </h4>
              <p className="text-gray-900 font-manrope">
                Type: {item.category}
              </p>
            </div>
          </div>
        ))}

        {/* Footer Actions */}
        <div className="flex flex-col justify-between gap-6 pt-4">
          {/* Status & Text */}
          <div className="flex items-center gap-3">
            <Badge
              className={`px-4 py-2 rounded-full font-medium text-sm shadow-none ${
                isAccepted
                  ? "bg-primary-200 text-primary"
                  : "bg-primary-50 text-primary border border-primary"
              }`}
            >
              {status}
            </Badge>
            <p className="text-gray-500 font-normal">
              Your Order has been {status.toLowerCase()}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-between items-center gap-3">
            <div className="gap-4 flex">
              {isAccepted && (
                <>
                  <Button
                    className="px-6 py-4! h-auto  rounded-2xl"
                    variant={"secondary"}
                  >
                    Tracker Order
                  </Button>
                  <Button variant="outline" className="px-6 rounded-2xl">
                    Invoice
                  </Button>
                </>
              )}

              {isDelivered && (
                <>
                  <Button
                    className="h-auto px-6 py-4 rounded-2xl"
                    variant={"secondary"}
                  >
                    Ad Review
                  </Button>
                  <Button variant="outline" className="px-6  rounded-2xl">
                    Invoice
                  </Button>
                </>
              )}
            </div>

            {isAccepted && (
              <Button
                variant="ghost"
                className="bg-[#FFF1F3] h-auto py-4 text-[#F43F5E] hover:bg-[#FFE4E8] hover:text-[#E11D48] rounded-xl px-7 text-sm font-medium transition-all md:ml-4"
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
