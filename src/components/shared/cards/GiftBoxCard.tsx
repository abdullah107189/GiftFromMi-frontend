import React from "react";
import { Button } from "@/components/ui/button";
import Rating from "../Rating";
import type { IFeaturedCard } from "@/types";

interface GiftBoxCardProps {
  product: IFeaturedCard;
}

const GiftBoxCard: React.FC<GiftBoxCardProps> = ({ product }) => {
  if (!product) return null;
  const { image, title, description, price, oldPrice, rating } = product;

  return (
    <div className="flex flex-col items-center p-4 gap-6 flex-1 rounded-2xl border border-primary-200 bg-white transition-all">
      {/* Product Image */}
      <div className="w-full h-83.5 overflow-hidden rounded-xl bg-gray-50">
        <img src={image} alt={title} className="w-full h-full object-cover" />
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
            <span className="text-2xl font-bold text-primary-500">
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
          <Button
            variant={"outline"}
            className="w-full rounded-lg bg-primary-500 text-primary-50 hover:bg-primary-500"
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GiftBoxCard;
