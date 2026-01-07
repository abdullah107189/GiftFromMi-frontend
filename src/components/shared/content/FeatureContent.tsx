import React from "react";
// Import your IconCheckbox if it's a separate component
// import { IconCheckbox } from "@/components/icons";

interface FeatureContentProps {
  title: string;
  description: string;
  features: string[];
  className?: string;
}

const FeatureContent: React.FC<FeatureContentProps> = ({
  title,
  description,
  features,
  className = "",
}) => {
  return (
    <div className={`flex flex-col  gap-6 w-full ${className}`}>
      {/* Header Section */}
      <h2 className="text-4xl md:text-5xl font-bold text-gray-700 leading-[1.1]">
        {title}
      </h2>

      <p className="text-gray-500 text-lg font-medium">{description}</p>

      {/* Feature List Section */}
      <div className="flex flex-col gap-4 w-full">
        {features.map((item, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="text-primary-400 shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 11 12 14 22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
            </div>

            {/* Feature Text */}
            <span className="text-gray-600 text-lg font-medium">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureContent;
