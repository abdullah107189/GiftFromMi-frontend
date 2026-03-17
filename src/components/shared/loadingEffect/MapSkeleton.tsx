const MapSkeleton = () => {
  return (
    <div className="w-full h-full rounded-2xl overflow-hidden relative bg-gray-200">
      <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
    </div>
  );
};

export default MapSkeleton;