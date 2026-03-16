const GiftBoxCardSkeleton = () => {
  return (
    <div className="flex flex-col items-center md:p-4 p-2 lg:gap-6 gap-4 flex-1 rounded-2xl border border-primary-200 bg-background animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full xl:h-83.5 lg:h-72 md:h-64 h-50 rounded-xl bg-gray-200" />

      {/* Content */}
      <div className="w-full flex flex-col gap-4">
        {/* Title + Price */}
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-2 w-1/2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-full"></div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="h-6 w-16 bg-gray-200 rounded"></div>
            <div className="h-4 w-12 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* Rating */}
        <div className="h-4 w-24 bg-gray-200 rounded"></div>

        {/* Button */}
        <div className="h-10 w-full bg-gray-200 rounded-xl"></div>
      </div>
    </div>
  );
};

export default GiftBoxCardSkeleton;
