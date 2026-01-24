import OrderCard from "@/components/Dashboard/Customer/MyOrders/OrderCard";
import SharedDropdown from "@/components/shared/SharedDropdown";
import type { IProduct } from "@/types";
import { useState } from "react";
import product1 from "@/assets/products/p2.png";
import SEO from "@/components/shared/SEO";

export function OrderListPage() {
  const [filter, setFilter] = useState("all");
  const [items] = useState<IProduct[]>([
    {
      id: "1",
      title: "Tech Accessories Pack",
      price: 500,
      oldPrice: 750,
      image: [
        product1,
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
        "https://images.unsplash.com/photo-1491933382434-500287f9b54b",
        "https://images.unsplash.com/photo-1586201375761-83865001e31c",
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0",
      ],
      rating: 5,
      reviewsCount: 124,
      stockCount: 12,
      inStock: true,
      description:
        "A thoughtfully curated premium tech accessories set design delight professionals, clients, and loved ones. Perfect for celebrations, office event, and corporate gifting.",
      category: "Gift Box",
    },
    {
      id: "1",
      title: "Tech Accessories Pack",
      price: 500,
      oldPrice: 750,
      image: [
        product1,
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
        "https://images.unsplash.com/photo-1491933382434-500287f9b54b",
        "https://images.unsplash.com/photo-1586201375761-83865001e31c",
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0",
      ],
      rating: 5,
      reviewsCount: 124,
      stockCount: 12,
      inStock: true,
      description:
        "A thoughtfully curated premium tech accessories set design delight professionals, clients, and loved ones. Perfect for celebrations, office event, and corporate gifting.",
      category: "Gift Box",
    },
    {
      id: "1",
      title: "Tech Accessories Pack",
      price: 500,
      oldPrice: 750,
      image: [
        product1,
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
        "https://images.unsplash.com/photo-1491933382434-500287f9b54b",
        "https://images.unsplash.com/photo-1586201375761-83865001e31c",
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0",
      ],
      rating: 5,
      reviewsCount: 124,
      stockCount: 12,
      inStock: true,
      description:
        "A thoughtfully curated premium tech accessories set design delight professionals, clients, and loved ones. Perfect for celebrations, office event, and corporate gifting.",
      category: "Gift Box",
    },
    {
      id: "1",
      title: "Tech Accessories Pack",
      price: 500,
      oldPrice: 750,
      image: [
        product1,
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
        "https://images.unsplash.com/photo-1491933382434-500287f9b54b",
        "https://images.unsplash.com/photo-1586201375761-83865001e31c",
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0",
      ],
      rating: 5,
      reviewsCount: 124,
      stockCount: 12,
      inStock: true,
      description:
        "A thoughtfully curated premium tech accessories set design delight professionals, clients, and loved ones. Perfect for celebrations, office event, and corporate gifting.",
      category: "Gift Box",
    },
    {
      id: "1",
      title: "Tech Accessories Pack",
      price: 500,
      oldPrice: 750,
      image: [
        product1,
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
        "https://images.unsplash.com/photo-1491933382434-500287f9b54b",
        "https://images.unsplash.com/photo-1586201375761-83865001e31c",
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0",
      ],
      rating: 5,
      reviewsCount: 124,
      stockCount: 12,
      inStock: true,
      description:
        "A thoughtfully curated premium tech accessories set design delight professionals, clients, and loved ones. Perfect for celebrations, office event, and corporate gifting.",
      category: "Gift Box",
    },
  ]);
  const options = [
    { label: "All", value: "all" },
    { label: "Newest First", value: "newest_first" },
    { label: "Oldest First", value: "oldest_first" },
    { label: "Delivered Only", value: "delivered_only" },
    { label: "Pending Only", value: "pending_only" },
  ];
  return (
    <div className="">
      <SEO
        title="My Orders"
        description="View and track your current active orders."
      />
      <div className="flex justify-between items-center mb-8">
        <h2 className="md:text-2xl text-xl font-semibold text-gray-900">
          Orders ({items.length})
        </h2>

        <div className="flex items-center gap-2">
          <h2 className=" text-gray-900">Short by:</h2>
          <SharedDropdown
            options={options}
            selectedValue={filter}
            onValueChange={(val) => setFilter(val)}
            className="bg-[#F5F5F6] border-none px-4 py-1 h-10 w-[150px]"
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto xl:p-10 lg:p-8 md:p-6 p-4 bg-white shadow-[0_6px_16px_0_rgba(0,0,0,0.12)] rounded-4xl overflow-hidden">
        {/* Order Cards */}
        <OrderCard
          orderId="#SDGT1344D"
          totalPayment="$150"
          paymentMethod="Card"
          deliveryDate="25 Dec 2025"
          status="accepted"
          items={items}
        />

        <OrderCard
          orderId="#SDGT1344D"
          totalPayment="$150"
          paymentMethod="Card"
          deliveryDate="25 Dec 2025"
          status="delivered"
          items={items}
        />
      </div>
    </div>
  );
}
