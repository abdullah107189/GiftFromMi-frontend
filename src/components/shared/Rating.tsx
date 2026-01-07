import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  rating: number;
  showText?: boolean;
  className?: string;
}

const Rating: React.FC<RatingProps> = ({
  rating,
  showText = true,
  className,
}) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={cn(
              "w-4 h-4",
              i < Math.floor(rating)
                ? "text-primary-400 fill-primary-400"
                : "text-gray-300 fill-gray-300"
            )}
          />
        ))}
      </div>

      {showText && (
        <span className="text-sm font-bold text-primary-400">
          ({rating.toFixed(1)})
        </span>
      )}
    </div>
  );
};

export default Rating;
