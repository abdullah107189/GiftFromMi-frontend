import ProductCard from "../shared/cards/ProductCard";
import { SectionHeader } from "../shared/headers/SectionHeader";
import { Button } from "../ui/button";
import p1 from "@/assets/products/p1.png";
import p2 from "@/assets/products/p2.png";
import p3 from "@/assets/products/p3.png";

function GiftCollection() {
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
      <div className="max-w-container mx-auto px-4 lg:px-0">
        {/* Header Section */}
        <SectionHeader
          title="Featured Gift Collections"
          subtitle="Carefully curated gifts that make lasting impressions"
        />

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Centered "View All" Button */}
        <div className="flex justify-center">
          <Button className="">View All Collections</Button>
        </div>
      </div>
    </section>
  );
}

export default GiftCollection;
