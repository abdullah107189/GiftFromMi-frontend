import React from "react";
import { Button } from "@/components/ui/button";
import Rating from "../Rating";
import type { IProduct } from "@/types";

interface FeaturedCardProps {
  featured: IProduct;
}

const FeaturedCard: React.FC<FeaturedCardProps> = ({ featured }) => {
  if (!featured) return null;
  const { image, title, description, price, oldPrice, rating } = featured;

  return (
    <div className="flex flex-col items-center x:p-6 md:p-6 p-4 gap-8 flex-1 rounded-2xl border border-primary-100 bg-white transition-all hover:shadow-lg">
      {/* Product Image */}
      <div className="w-full xl:h-70 h-60 overflow-hidden rounded-t-xl bg-gray-50">
        <img
          src={image[0]}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="w-full flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold text-gray-700 line-clamp-1">
              {title}
            </h3>
            <p className="text-base text-gray-500 line-clamp-1">
              {description}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary-400">
              ${price}
            </span>
            {oldPrice && (
              <span className="text-base text-gray-500 line-through">
                ${oldPrice}
              </span>
            )}
          </div>
        </div>

        <Rating rating={rating}></Rating>

        <div className="mt-2">
          <Button variant={"outline"} className="w-full rounded-lg">
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCard;
