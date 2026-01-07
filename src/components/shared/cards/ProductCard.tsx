import React from "react";
import { Star } from "lucide-react";
import type { Product } from "@/types";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { image, title, description, price, oldPrice, rating, reviewsCount } =
    product;

  return (
    <div className="flex flex-col items-center p-6 gap-8 flex-1 rounded-2xl border border-primary-100 bg-white transition-all hover:shadow-lg">
      {/* Product Image */}
      <div className="w-full h-70 overflow-hidden rounded-t-xl bg-gray-50">
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

        {/* Rating Section */}
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                fill={i < Math.floor(rating) ? "#D0A15A" : "none"}
                stroke={i < Math.floor(rating) ? "#D0A15A" : "#D0D5DD"}
              />
            ))}
          </div>
          <span className="text-sm font-semibold text-primary-400">
            ({reviewsCount})
          </span>
        </div>

        <div className="mt-2">
          <Button variant={"outline"} className="w-full rounded-lg">
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
