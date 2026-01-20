import { useState } from "react";

const CheckoutToggle = () => {
  const [isBulk, setIsBulk] = useState(false);
  return (
    <div className="flex items-center justify-center xl:mt-2 mt-6 xl:gap-6 md:gap-4 gap-3 xl:mb-12 md:mb-8 mb-6">
      <span className="text-gray-900">Single Order</span>
      <button
        onClick={() => setIsBulk(!isBulk)}
        className="flex w-30 h-14 items-center p-1 bg-gray-300 rounded-full transition-all duration-300 hover:opacity-90 shadow-inner cursor-pointer"
      >
        <div
          className={`w-12 h-12 bg-background rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
            isBulk ? "translate-x-16" : "translate-x-0"
          }`}
        />
      </button>

      <span className="text-gray-900">Bulk Order</span>
    </div>
  );
};

export default CheckoutToggle;
