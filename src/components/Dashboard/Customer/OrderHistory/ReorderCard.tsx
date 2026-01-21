import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { IOrderHistory } from "@/types/orders";

export default function ReorderCard({ order }: { order: IOrderHistory }) {
  return (
    <div className="bg-white border border-gray-300 p-4  rounded-2xl">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <span className="text-xl font-medium text-gray-700">
            {order.orderId}
          </span>
          <span className="text-gray-700 text-[18px]">{order.date}</span>
          <Badge className="bg-[#2E8B571C] text-[#2E8B57] rounded-full xl:px-7 lg:px-6 md:px-4 px-2 xl:py-2 lg:py-1 md:py-1 py-1 border-none font-medium">
            {order.status}
          </Badge>
        </div>

        <Button
          variant={"secondary"}
          className="rounded-lg px-2.5  font-medium"
        >
          Reorder All
        </Button>
      </div>

      {/* Product Items Section */}
      <div className="space-y-8">
        {order.items.map((item, index: number) => (
          <div key={item?.id}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="w-[100px] h-[102px] aspect-50/51 rounded-2xl overflow-hidden bg-gray-50">
                  <img
                    src={item?.image}
                    alt={item?.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <h4 className="text-2xl font-medium text-gray-900 md:mb-6 mb-4">
                    {item?.title}
                  </h4>
                  <p className="text-gray-900 font-normal font-manrope">
                    Type: {item?.category}
                  </p>
                </div>
              </div>

              <Button
                variant="outline"
                className="font-medium p-2.5 rounded-lg"
              >
                Add Again
              </Button>
            </div>

            {index !== order.items.length - 1 && (
              <div className="border-b border-gray-200 mt-8" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
