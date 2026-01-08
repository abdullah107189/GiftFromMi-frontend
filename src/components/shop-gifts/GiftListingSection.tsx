import { Search, ChevronDown } from "lucide-react";

import p1 from "@/assets/products/p1.png";
import p2 from "@/assets/products/p2.png";
import p3 from "@/assets/products/p3.png";
import GiftBoxCard from "../shared/cards/GiftBoxCard";

const GiftListingSection = () => {
  const PRODUCTS = [
    {
      id: 1,
      image: p1,
      title: "Chocolate With Premium Box",
      description: "Experience the Taste of True Luxury",
      price: 20,
      oldPrice: 30,
      rating: 5,
      reviewsCount: "5/5",
    },
    {
      id: 2,
      image: p2,
      title: "Tech Accessories Pack",
      description: "Premium Wireless Charger, Phone Stand",
      price: 220,
      oldPrice: 300,
      rating: 5,
      reviewsCount: "5/5",
    },
    {
      id: 3,
      image: p3,
      title: "Perfume box",
      description: "Experience the Premium Perfume",
      price: 20,
      oldPrice: 30,
      rating: 5,
      reviewsCount: "5/5",
    },
  ];
  return (
    <section className="py-15">
      <div className="max-w-container mx-auto px-3">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side: Sidebar */}
          <aside className="w-full lg:w-1/4 flex flex-col gap-8">
            {/* Categories Card */}
            <div className="border border-gray-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <div className="grid grid-cols-2 gap-0.5">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 border border-orange-400 rounded-sm"
                    />
                  ))}
                </div>
                <h3 className="text-xl font-bold text-gray-700">Categories</h3>
              </div>
              <ul className="flex flex-col gap-4">
                {[
                  "All Gifts",
                  "Gift Boxes",
                  "Custom Item",
                  "New Homeowner",
                  "Holidays",
                  "Birthday",
                ].map((cat, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between items-center text-gray-500 hover:text-primary cursor-pointer transition-colors"
                  >
                    <span>{cat}</span>
                    <span className="text-sm">102</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Range Card */}
            <div className="border border-gray-100 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-700 mb-6">
                Price Range
              </h3>
              <div className="flex flex-col gap-4">
                {[
                  "Under $50",
                  "$50-$100",
                  "$100-$150",
                  "$150-$200",
                  "$200-$250",
                  "$250+",
                ].map((range, idx) => (
                  <label
                    key={idx}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      className="w-5 h-5 border-gray-300 rounded accent-primary cursor-pointer"
                    />
                    <span className="text-gray-500 group-hover:text-primary transition-colors">
                      {range}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Right Side: Product Listing */}
          <main className="flex-1">
            {/* Top Bar: Search & Sort */}
            <div className="flex flex-col md:flex-row gap-4 justify-between mb-10">
              <div className="relative flex-1 max-w-xl">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full py-3 px-12 border border-gray-200 rounded-full focus:outline-none focus:border-primary"
                />
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-full text-gray-500 cursor-pointer min-w-[180px] justify-between">
                  <span>Sort by: Featured</span>
                  <ChevronDown size={18} />
                </div>
              </div>
            </div>

            {/* Gift Grid Header */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800">Gift Boxes</h2>
              <button className="text-primary font-medium border border-primary px-6 py-2 rounded-xl hover:bg-primary hover:text-white transition-all">
                View All
              </button>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {PRODUCTS?.map((product) => {
                return (
                  <GiftBoxCard product={product} key={product.id}></GiftBoxCard>
                );
              })}
            </div>
          </main>
        </div>
      </div>
    </section>
  );
};

export default GiftListingSection;
