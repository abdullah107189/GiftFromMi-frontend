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
      id: 1,
      category_id: 1,
      brand_id: 1,
      cj_product_id: null,
      source_type: "mock",
      title: "Tech Accessories Pack",
      slug: "tech-accessories-pack",
      description:
        "A thoughtfully curated premium tech accessories set design delight professionals, clients, and loved ones. Perfect for celebrations, office event, and corporate gifting.",
      short_description: "Premium tech accessories set",
      status: true,
      is_featured: false,
      is_customizable: false,
      meta_title: "Tech Accessories Pack",
      meta_description: null,
      deleted_at: null,
      product_image: [
        {
          id: 1,
          product_id: 1,
          image: product1,
          imageUrl: product1,
        },
      ],
    },
    {
      id: 2,
      category_id: 1,
      brand_id: 1,
      cj_product_id: null,
      source_type: "mock",
      title: "Tech Accessories Pack",
      slug: "tech-accessories-pack-2",
      description:
        "A thoughtfully curated premium tech accessories set design delight professionals, clients, and loved ones. Perfect for celebrations, office event, and corporate gifting.",
      short_description: "Premium tech accessories set",
      status: true,
      is_featured: false,
      is_customizable: false,
      meta_title: "Tech Accessories Pack",
      meta_description: null,
      deleted_at: null,
      product_image: [
        {
          id: 2,
          product_id: 2,
          image: product1,
          imageUrl: product1,
        },
      ],
    },
    {
      id: 3,
      category_id: 1,
      brand_id: 1,
      cj_product_id: null,
      source_type: "mock",
      title: "Tech Accessories Pack",
      slug: "tech-accessories-pack-3",
      description:
        "A thoughtfully curated premium tech accessories set design delight professionals, clients, and loved ones. Perfect for celebrations, office event, and corporate gifting.",
      short_description: "Premium tech accessories set",
      status: true,
      is_featured: false,
      is_customizable: false,
      meta_title: "Tech Accessories Pack",
      meta_description: null,
      deleted_at: null,
      product_image: [
        {
          id: 3,
          product_id: 3,
          image: product1,
          imageUrl: product1,
        },
      ],
    },
    {
      id: 4,
      category_id: 1,
      brand_id: 1,
      cj_product_id: null,
      source_type: "mock",
      title: "Tech Accessories Pack",
      slug: "tech-accessories-pack-4",
      description:
        "A thoughtfully curated premium tech accessories set design delight professionals, clients, and loved ones. Perfect for celebrations, office event, and corporate gifting.",
      short_description: "Premium tech accessories set",
      status: true,
      is_featured: false,
      is_customizable: false,
      meta_title: "Tech Accessories Pack",
      meta_description: null,
      deleted_at: null,
      product_image: [
        {
          id: 4,
          product_id: 4,
          image: product1,
          imageUrl: product1,
        },
      ],
    },
    {
      id: 5,
      category_id: 1,
      brand_id: 1,
      cj_product_id: null,
      source_type: "mock",
      title: "Tech Accessories Pack",
      slug: "tech-accessories-pack-5",
      description:
        "A thoughtfully curated premium tech accessories set design delight professionals, clients, and loved ones. Perfect for celebrations, office event, and corporate gifting.",
      short_description: "Premium tech accessories set",
      status: true,
      is_featured: false,
      is_customizable: false,
      meta_title: "Tech Accessories Pack",
      meta_description: null,
      deleted_at: null,
      product_image: [
        {
          id: 5,
          product_id: 5,
          image: product1,
          imageUrl: product1,
        },
      ],
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
