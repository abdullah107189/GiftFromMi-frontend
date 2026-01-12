import type { IProduct } from "@/types";
import FeaturedCard from "../shared/cards/FeaturedCard";
import { SectionHeader } from "../shared/headers/SectionHeader";
import { Button } from "../ui/button";
import p1 from "@/assets/products/p1.png";
import p2 from "@/assets/products/p2.png";
import p3 from "@/assets/products/p3.png";

function GiftCollection() {
  const PRODUCTS: IProduct[] = [
    {
      id: 1,
      image: [p1, "/extra-1.png", "/extra-2.png"], // Array format
      title: "Chocolate With Premium Box",
      description: "Experience the Taste of True Luxury",
      price: 20,
      oldPrice: 30,
      rating: 5,
      reviewsCount: 150,
      stockCount: 10,
      inStock: true,
    },
    {
      id: 2,
      image: [p2],
      title: "Tech Accessories Pack",
      description: "Premium Wireless Charger, Phone Stand",
      price: 220,
      oldPrice: 300,
      rating: 5,
      reviewsCount: 85,
      stockCount: 5,
      inStock: true,
    },
    {
      id: 3,
      image: [p3],
      title: "Perfume box",
      description: "Experience the Premium Perfume",
      price: 20,
      oldPrice: 30,
      rating: 5,
      reviewsCount: 210,
      stockCount: 0,
      inStock: false,
    },
  ];

  return (
    <section className="pb-15">
      <div className="max-w-container mx-auto px-3 ">
        {/* Header Section */}
        <SectionHeader
          title="Featured Gift Collections"
          subtitle="Carefully curated gifts that make lasting impressions"
        />

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((product) => (
            <FeaturedCard key={product.id} featured={product} />
          ))}
        </div>

        {/* Centered "View All" Button */}
        <div className="flex justify-center mt-8">
          <Button className="">View All Collections</Button>
        </div>
      </div>
    </section>
  );
}

export default GiftCollection;
