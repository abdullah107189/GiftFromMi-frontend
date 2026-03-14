import { Button } from "../ui/button";
import type { Category } from "@/types/public";
import GiftBoxCard from "../shared/cards/GiftBoxCard";
import { Link } from "react-router";

const GiftCategoriesSection = ({ categories }: { categories: Category[] }) => {
  if (!categories) return null;
  return (
    <section className="py-16 bg-background">
      <div className="max-w-container mx-auto px-3 flex flex-col xl:gap-10 md:gap-8 gap-6">
        {categories?.slice(1)?.map((group, index) => (
          <div key={index} className="flex flex-col gap-8">
            {/* Header: Title and View All */}
            <div className="flex justify-between items-center pb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                {group?.name ?? "Category"}
              </h2>
              <Link to={`/shop-gifts/category/${group?.id}`}>
                <Button
                  variant={"outline"}
                  className="text-gray-700 font-semibold"
                >
                  View All
                </Button>
              </Link>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-6 lg:gap-5 md:gap-4 gap-4 w-full ">
              {group?.products?.length ? (
                group?.products?.map((product, productIndex) =>
                  product ? (
                    <GiftBoxCard
                      key={product?.id ?? `${index}-${productIndex}`}
                      product={product}
                    />
                  ) : null,
                )
              ) : (
                <p className="text-center w-full col-span-4 text-gray-500">
                  Product not found
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GiftCategoriesSection;
