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
import type { IProductCategory } from "@/types";

const GiftCategoriesSection = () => {
  const GIFT_DATA: IProductCategory[] = [
    {
      category: "Custom Item",
      products: [
        {
          id: 101,
          title: "Tech Accessories Pack",
          price: 20,
          oldPrice: 30,
          image: [p4, "/g1.png", "/g2.png"],
          rating: 5,
          reviewsCount: 124,
          stockCount: 12,
          inStock: true,
          description:
            "Experience the Taste of True Luxury with our premium tech set.",
          category: "Custom Item",
        },
        {
          id: 102,
          title: "Smart Office Kit",
          price: 20,
          oldPrice: 30,
          image: [p5, "/o1.png"],
          rating: 5,
          reviewsCount: 88,
          stockCount: 5,
          inStock: true,
          description: "Experience the Taste of True Luxury in your workspace.",
          category: "Custom Item",
        },
        {
          id: 103,
          title: "Luxury Gift Box",
          price: 20,
          oldPrice: 30,
          image: [p6],
          rating: 5,
          reviewsCount: 45,
          stockCount: 20,
          inStock: true,
          description: "A perfect gift box for any special occasion.",
          category: "Custom Item",
        },
        {
          id: 104,
          title: "Perfume Box Deluxe",
          price: 20,
          oldPrice: 30,
          image: [p7],
          rating: 5,
          reviewsCount: 210,
          stockCount: 0,
          inStock: false, // স্টক শেষ হলে false
          description: "Experience the Taste of True Luxury scent.",
          category: "Custom Item",
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
          image: [p8, "/k1.png"],
          rating: 5,
          reviewsCount: 67,
          stockCount: 15,
          inStock: true,
          description: "Upgrade your kitchen with luxury tools.",
          category: "New Homeowner",
        },
        {
          id: 202,
          title: "Modern Tech Pack",
          price: 20,
          oldPrice: 30,
          image: [p9],
          rating: 5,
          reviewsCount: 34,
          stockCount: 8,
          inStock: true,
          description: "Modern solutions for a modern home.",
          category: "New Homeowner",
        },
        {
          id: 203,
          title: "Classic Home Box",
          price: 20,
          oldPrice: 30,
          image: [p10],
          rating: 5,
          reviewsCount: 12,
          stockCount: 30,
          inStock: true,
          description: "Everything a new home needs.",
          category: "New Homeowner",
        },
        {
          id: 204,
          title: "Fragrance Set",
          price: 20,
          oldPrice: 30,
          image: [p11],
          rating: 5,
          reviewsCount: 99,
          stockCount: 10,
          inStock: true,
          description: "Feel at home with luxury fragrance.",
          category: "New Homeowner",
        },
      ],
    },
    {
      category: "Holidays",
      products: [
        {
          id: 301,
          title: "Holiday Tech Pack",
          price: 20,
          oldPrice: 30,
          image: [p12],
          rating: 5,
          reviewsCount: 156,
          stockCount: 25,
          inStock: true,
          description: "Holiday tech essentials for travelers.",
          category: "Holidays",
        },
        {
          id: 302,
          title: "Travelers Kit",
          price: 20,
          oldPrice: 30,
          image: [p13],
          rating: 5,
          reviewsCount: 42,
          stockCount: 4,
          inStock: true,
          description: "Experience luxury during your holidays.",
          category: "Holidays",
        },
        {
          id: 303,
          title: "Festive Box",
          price: 20,
          oldPrice: 30,
          image: [p14],
          rating: 5,
          reviewsCount: 81,
          stockCount: 18,
          inStock: true,
          description: "Celebrate holidays with luxury gifts.",
          category: "Holidays",
        },
        {
          id: 304,
          title: "Scented Holiday Box",
          price: 20,
          oldPrice: 30,
          image: [p15],
          rating: 5,
          reviewsCount: 130,
          stockCount: 22,
          inStock: true,
          description: "Premium scents for the holiday season.",
          category: "Holidays",
        },
      ],
    },
    {
      category: "Birthday",
      products: [
        {
          id: 401,
          title: "Birthday Gift Pack",
          price: 20,
          oldPrice: 30,
          image: [p16, "/b1.png"],
          rating: 5,
          reviewsCount: 320,
          stockCount: 50,
          inStock: true,
          description: "Make their birthday special with luxury.",
          category: "Birthday",
        },
        {
          id: 402,
          title: "Special Birthday Surprise",
          price: 20,
          oldPrice: 30,
          image: [p17],
          rating: 5,
          reviewsCount: 140,
          stockCount: 15,
          inStock: true,
          description: "A surprise box for a perfect birthday.",
          category: "Birthday",
        },
        {
          id: 403,
          title: "Luxury Birthday Cake Box",
          price: 20,
          oldPrice: 30,
          image: [p18],
          rating: 5,
          reviewsCount: 500,
          stockCount: 20,
          inStock: true,
          description: "Celebrate with the taste of true luxury.",
          category: "Birthday",
        },
        {
          id: 404,
          title: "Sweet Birthday Box",
          price: 20,
          oldPrice: 30,
          image: [p19],
          rating: 5,
          reviewsCount: 215,
          stockCount: 12,
          inStock: true,
          description: "Sweet treats in a luxury box.",
          category: "Birthday",
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
