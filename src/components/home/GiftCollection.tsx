/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IProduct } from "@/types";
import FeaturedCard from "../shared/cards/FeaturedCard";
import { SectionHeader } from "../shared/headers/SectionHeader";
import { Button } from "../ui/button";
import { Link } from "react-router";

function GiftCollection({
  isHomeLoading,
  PRODUCTS,
}: {
  isHomeLoading: boolean;
  PRODUCTS: IProduct[];
}) {
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
          {isHomeLoading
            ? Array.from({ length: 3 }).map((_, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center lg:p-6 md:p-4 p-2 gap-8 flex-1 rounded-2xl border border-primary-100 bg-white transition-all animate-pulse"
                >
                  {/* Image skeleton */}
                  <div className="w-full xl:h-70 lg:h-60 md:h-50 h-40 bg-gray-200 rounded-t-xl" />

                  {/* Info skeleton */}
                  <div className="w-full flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col gap-2">
                        <div className="h-5 w-3/4 bg-gray-300 rounded" />
                        <div className="h-4 w-1/2 bg-gray-300 rounded" />
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="h-8 w-14 bg-gray-300 rounded" />
                        <div className="h-6 w-10 bg-gray-200 rounded" />
                      </div>
                    </div>

                    {/* Rating skeleton */}
                    <div className="h-4 w-20 bg-gray-300 rounded" />

                    {/* Button skeleton */}
                    <div className="h-10 w-full bg-gray-300 rounded" />
                  </div>
                </div>
              ))
            : PRODUCTS?.map((product: IProduct) => (
                <FeaturedCard key={product.id} featured={product} />
              ))}
        </div>

        {/* Centered "View All" Button */}
        <Link to="/shop-gifts" className="flex justify-center mt-8">
          <Button className="">View All Collections</Button>
        </Link>
      </div>
    </section>
  );
}

export default GiftCollection;
