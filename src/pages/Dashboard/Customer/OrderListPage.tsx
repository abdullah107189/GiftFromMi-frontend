import OrderCard from "@/components/Dashboard/Customer/MyOrders/OrderCard";
import SharedDropdown from "@/components/shared/SharedDropdown";
import { useState } from "react";
import SEO from "@/components/shared/SEO";
import type { CustomerOrdersResponse } from "@/types/orders";

const ordersResponse: CustomerOrdersResponse = {
  data: [
    {
      id: 21,
      order_id: "#order_69abb4f57186d",
      total: 152,
      payment_method: "Card",
      fulfillment_status: "processing",
      payment_status: "paid",
      created_at: "2026-03-07T05:17:41.000000Z",
      is_bulk: 1,
      recipient_count: 19,
      items: [
        {
          product_title:
            "Happy Birthday Letter Flag Party Background Wall Decoration",
          image:
            "https://cf.cjdropshipping.com/62d7da8a-3cb1-479a-b11d-98951c874ac9.jpg",
          category: "Basia Hines",
          total_quantity: 19,
          estimated_delivery: "—",
        },
      ],
    },
    {
      id: 20,
      order_id: "#order_69abb3e770940",
      total: 152,
      payment_method: "Card",
      fulfillment_status: "pending",
      payment_status: "pending",
      created_at: "2026-03-07T05:13:11.000000Z",
      is_bulk: 1,
      recipient_count: 19,
      items: [
        {
          product_title:
            "Happy Birthday Letter Flag Party Background Wall Decoration",
          image:
            "https://cf.cjdropshipping.com/62d7da8a-3cb1-479a-b11d-98951c874ac9.jpg",
          category: "Basia Hines",
          total_quantity: 19,
          estimated_delivery: "—",
        },
      ],
    },
    {
      id: 17,
      order_id: "#order_69abaac5cb846",
      total: 8,
      payment_method: "Card",
      fulfillment_status: "processing",
      payment_status: "paid",
      created_at: "2026-03-07T04:34:13.000000Z",
      is_bulk: 0,
      items: [
        {
          id: 20,
          product_title:
            "Happy Birthday Letter Flag Party Background Wall Decoration",
          image:
            "https://cf.cjdropshipping.com/62d7da8a-3cb1-479a-b11d-98951c874ac9.jpg",
          category: "Basia Hines",
          quantity: 1,
          sell_price: 8,
          estimated_delivery: "—",
        },
      ],
    },
    {
      id: 3,
      order_id: "#order_69a7a8ffbe66a",
      total: 74,
      payment_method: "Card",
      fulfillment_status: "delivered",
      payment_status: "paid",
      created_at: "2026-03-04T03:37:35.000000Z",
      is_bulk: 0,
      items: [
        {
          id: 5,
          product_title:
            "Mobile phone cover cover, protective cover, window opening, mobile phone cover, new mobile phone case.",
          image: "https://cf.cjdropshipping.com/15282144/25872508504920.png",
          category: "Gift",
          quantity: 4,
          sell_price: 5,
          estimated_delivery: "—",
        },
        {
          id: 6,
          product_title: "Gamepad PC Computer",
          image:
            "https://oss-cf.cjdropshipping.com/product/2025/06/09/05/82b815ca-6c00-46de-8555-d98b66e6f2bb_trans.jpeg",
          category: "Gift",
          quantity: 3,
          sell_price: 18,
          estimated_delivery: "—",
        },
      ],
    },
  ],
  message: "Data fetched successfully",
  status: 200,
};

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

  const displayedOrders = [...ordersResponse.data]
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
