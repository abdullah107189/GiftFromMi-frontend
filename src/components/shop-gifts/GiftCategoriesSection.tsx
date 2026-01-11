import GiftBoxCard from "../shared/cards/GiftBoxCard";
import p4 from "@/assets/products/p4.png";
import p5 from "@/assets/products/p5.png";
import p6 from "@/assets/products/p6.png";
import p7 from "@/assets/products/p7.png";
import p8 from "@/assets/products/p8.png";
import p9 from "@/assets/products/p9.png";
import p10 from "@/assets/products/p10.png";
import p11 from "@/assets/products/p11.png";
import p12 from "@/assets/products/p12.png";
import p13 from "@/assets/products/p13.png";
import p14 from "@/assets/products/p14.png";
import p15 from "@/assets/products/p15.png";
import p16 from "@/assets/products/p16.png";
import p17 from "@/assets/products/p17.png";
import p18 from "@/assets/products/p18.png";
import p19 from "@/assets/products/p19.png";

import { Button } from "../ui/button";

const GiftCategoriesSection = () => {
  const GIFT_DATA = [
    {
      category: "Custom Item",
      products: [
        {
          id: 101,
          title: "Tech Accessories Pack",
          price: 20,
          oldPrice: 30,
          image: p4,
          rating: 5,
          description: "Experience the Taste of True Luxury",
        },
        {
          id: 102,
          title: "Tech Accessories Pack",
          price: 20,
          oldPrice: 30,
          image: p5,
          rating: 5,
          description: "Experience the Taste of True Luxury",
        },
        {
          id: 103,
          title: "Gift Box",
          price: 20,
          oldPrice: 30,
          image: p6,
          rating: 5,
          description: "Experience the Taste of True Luxury",
        },
        {
          id: 104,
          title: "perfume box",
          price: 20,
          oldPrice: 30,
          image: p7,
          rating: 5,
          description: "Experience the Taste of True Luxury",
        },
      ],
    },
    {
      category: "New Homeowner",
      products: [
        {
          id: 201,
          title: "Kitchen Accessories",
          price: 20,
          oldPrice: 30,
          image: p8,
          rating: 5,
          description: "Experience the Taste of True Luxury",
        },
        {
          id: 202,
          title: "Tech Accessories Pack",
          price: 20,
          oldPrice: 30,
          image: p9,
          rating: 5,
          description: "Experience the Taste of True Luxury",
        },
        {
          id: 203,
          title: "Gift Box",
          price: 20,
          oldPrice: 30,
          image: p10,
          rating: 5,
          description: "Experience the Taste of True Luxury",
        },
        {
          id: 204,
          title: "perfume box",
          price: 20,
          oldPrice: 30,
          image: p11,
          rating: 5,
          description: "Experience the Taste of True Luxury",
        },
      ],
    },
    {
      category: "Holidays",
      products: [
        {
          id: 301,
          title: "Tech Accessories Pack",
          price: 20,
          oldPrice: 30,
          image: p12,
          rating: 5,
          description: "Experience the Taste of True Luxury",
        },
        {
          id: 302,
          title: "Tech Accessories Pack",
          price: 20,
          oldPrice: 30,
          image: p13,
          rating: 5,
          description: "Experience the Taste of True Luxury",
        },
        {
          id: 303,
          title: "Gift Box",
          price: 20,
          oldPrice: 30,
          image: p14,
          rating: 5,
          description: "Experience the Taste of True Luxury",
        },
        {
          id: 304,
          title: "perfume box",
          price: 20,
          oldPrice: 30,
          image: p15,
          rating: 5,
          description: "Experience the Taste of True Luxury",
        },
      ],
    },
    {
      category: "Birthday", // image_580a8b.png থেকে নেওয়া ডেটা
      products: [
        {
          id: 401,
          title: "Birthday Gift",
          price: 20,
          oldPrice: 30,
          image: p16,
          rating: 5,
          description: "Experience the Taste of True Luxury",
        },
        {
          id: 402,
          title: "Birthday Gift",
          price: 20,
          oldPrice: 30,
          image: p17,
          rating: 5,
          description: "Experience the Taste of True Luxury",
        },
        {
          id: 403,
          title: "Birthday Cake",
          price: 20,
          oldPrice: 30,
          image: p18,
          rating: 5,
          description: "Experience the Taste of True Luxury",
        },
        {
          id: 404,
          title: "Birthday Cake",
          price: 20,
          oldPrice: 30,
          image: p19,
          rating: 5,
          description: "Experience the Taste of True Luxury",
        },
      ],
    },
  ];
  return (
    <section className="py-16 bg-background">
      <div className="max-w-container mx-auto px-3 flex flex-col xl:gap-10 md:gap-8 gap-6">
        {GIFT_DATA.map((group, index) => (
          <div key={index} className="flex flex-col gap-8">
            {/* Header: Title and View All */}
            <div className="flex justify-between items-center pb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                {group.category}
              </h2>
              <Button
                variant={"outline"}
                className="text-gray-700 font-semibold"
              >
                View All
              </Button>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-6 lg:gap-5 md:gap-4 gap-4">
              {group.products.map((product) => (
                <GiftBoxCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GiftCategoriesSection;
