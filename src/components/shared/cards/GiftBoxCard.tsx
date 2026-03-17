import { Button } from "@/components/ui/button";
import Rating from "../Rating";
import { useNavigate } from "react-router";
import type { IProduct } from "@/types";

// interface GiftBoxCardProps {
//   product: IProduct;
// }
const GiftBoxCard = ({ product }: { product: IProduct }) => {
  const navigate = useNavigate();
  if (!product) return null;
  const { id, product_image, title, short_description, variants } = product;
  const sell_price = variants?.[0]?.sell_price;
  const price = variants?.[0]?.price;
  console.log("product", product);
  return (
    <div className="flex flex-col items-center md:p-4 p-2 lg:gap-6 gap-4 flex-1 rounded-2xl border border-primary-200 bg-background transition-all">
      <div className="w-full xl:h-83.5 lg:h-72 md:h-64 h-50 overflow-hidden rounded-xl bg-gray-50">
        <img
          src={product_image?.imageUrl}
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

          <div className="ml-auto flex items-start gap-2">
            <span className="text-4xl font-semibold text-primary">
              ${sell_price || "N/A"}
            </span>
            <span className="text-gray-500 text-xl font-medium line-through">
              ${price || "N/A"}
            </span>
          </div>
        </div>

        <Rating rating={5}></Rating>

        <div className="mt-2">
          <Button
            variant={"outline"}
            className="w-full rounded-2xl bg-primary-500 text-primary-50 hover:bg-primary-500"
            onClick={() => navigate(`/shop-gifts/${id}`)}
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GiftBoxCard;
