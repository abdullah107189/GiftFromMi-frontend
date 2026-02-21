import React from "react";
import { Button } from "@/components/ui/button";
import Rating from "../Rating";
import type { IProduct } from "@/types";
import { Link } from "react-router";
import { getImagesFromDescription } from "@/utils/converter/getImagesFromDescription";

interface FeaturedCardProps {
  featured: IProduct;
}

const FeaturedCard: React.FC<FeaturedCardProps> = ({ featured }) => {
  if (!featured) return null;
  const { id, title, description, short_description } = featured;
  const images = getImagesFromDescription(description);
  return (
    <div className="flex flex-col items-center lg:p-6 md:p-4 p-2 gap-8 flex-1 rounded-2xl border border-primary-100 bg-white transition-all hover:shadow-lg">
      {/* Product Image */}
      <div className="w-full xl:h-70 lg:h-60 md:h-50 h-40 overflow-hidden rounded-t-xl bg-gray-50">
        <img
          src={images[0]}
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
              {short_description}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary-400">
              {/* ${price ? price : "N/A"} */}
              500
            </span>
            {/* {oldPrice && (
              <span className="text-base text-gray-500 line-through">
                ${oldPrice}
              </span>
            )} */}
            700
          </div>
        </div>

        <Rating rating={5}></Rating>

        <Link to={`/shop-gifts/${id}`} className="mt-2">
          <Button variant={"outline"} className="w-full rounded-lg">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedCard;
