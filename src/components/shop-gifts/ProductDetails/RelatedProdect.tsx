import GiftBoxCard from "@/components/shared/cards/GiftBoxCard";
import { Button } from "@/components/ui/button";
import type { IProduct } from "@/types";

function RelatedProdect({ relatedProducts }: { relatedProducts: IProduct[] }) {
  if (!relatedProducts || relatedProducts.length === 0) {
    return (
      <div className="text-center xl:pt-20 md:pt-10 pt-5">
        No related products found
      </div>
    );
  }

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
          {relatedProducts.map((item, idx) => (
            <GiftBoxCard key={`${item.id}-${idx}`} product={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default RelatedProdect;
