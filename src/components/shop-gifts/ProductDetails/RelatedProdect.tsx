import GiftBoxCard from "@/components/shared/cards/GiftBoxCard";
import { Button } from "@/components/ui/button";
import type { IProduct } from "@/types";
const products: IProduct[] = [
  {
    id: "1",
    title: "Tech Accessories Pack",
    price: 500,
    oldPrice: 750,
    image: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf",
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
  },
  {
    id: "1",
    title: "Tech Accessories Pack",
    price: 500,
    oldPrice: 750,
    image: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf",
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
  },
  {
    id: "1",
    title: "Tech Accessories Pack",
    price: 500,
    oldPrice: 750,
    image: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf",
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
  },
  {
    id: "1",
    title: "Tech Accessories Pack",
    price: 500,
    oldPrice: 750,
    image: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf",
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
  }
];
function RelatedProdect() {
  return (
    <section className="xl:pt-20 xl:pb-10 md:py-10 py-5 bg-background">
      <div className="max-w-container mx-auto px-3 flex flex-col xl:gap-10 md:gap-8 gap-6">
        {/* Header: Title and View All */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Related Products
          </h2>
          <Button variant={"outline"} className="text-gray-700 font-semibold">
            View All
          </Button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-6 lg:gap-5 md:gap-4 gap-4">
          {products.map((product) => (
            <GiftBoxCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default RelatedProdect;
