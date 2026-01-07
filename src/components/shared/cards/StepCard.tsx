import React from "react";
import type { Step } from "@/types";

interface StepCardProps {
  step: Step;
}

const StepCard: React.FC<StepCardProps> = ({ step }) => {
  const { number, title, description, icon } = step;

  return (
    <div className="group relative p-5 bg-white border border-primary-100 rounded-2xl hover:shadow-xl hover:shadow-gray-100/50 transition-all duration-300 flex flex-col">
      {/* Top Section */}
      <div className="flex justify-between items-start">
        <div className="w-18 h-18 rounded-full bg-primary-50 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <span className="text-[56px] font-bold leading-none text-primary-100 mt-8 select-none">
          {number}
        </span>
      </div>

      {/* Content */}
      <div className="">
        <h3 className="text-2xl lg:text-[32px] font-bold text-gray-700 tracking-tight mb-4">
          {title}
        </h3>
        <p className="text-gray-500 text-base lg:text-lg leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default StepCard;
