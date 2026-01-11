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
    <div
      className={`flex flex-col xl:gap-6 md:gap-4 gap-3 w-full ${className}`}
    >
      {/* Header Section */}
      <h2 className="xl:text-[40px] lg:text-4xl text-3xl font-bold text-gray-700 leading-[1.1]">
        {title}
      </h2>

      <p className="text-gray-500 text-base font-medium">{description}</p>

      {/* Feature List Section */}
      <div className="flex flex-col gap-4 w-full mb-4 sm:mb-0">
        {features.map((item, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="text-primary-400 shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <g clip-path="url(#clip0_845_22027)">
                  <path
                    d="M23.6463 2.79931C23.5341 2.68707 23.4009 2.59803 23.2543 2.53729C23.1077 2.47655 22.9506 2.4453 22.7919 2.44531C22.6332 2.44533 22.4761 2.47661 22.3295 2.53738C22.1829 2.59815 22.0497 2.68721 21.9375 2.79947L11.0934 13.6453L6.09804 8.64975C5.87145 8.42315 5.56413 8.29583 5.24368 8.2958C4.92322 8.29577 4.61588 8.42303 4.38924 8.64959C4.277 8.76176 4.18796 8.89495 4.12721 9.04155C4.06645 9.18814 4.03517 9.34527 4.03516 9.50396C4.03514 9.66264 4.06639 9.81978 4.12712 9.96638C4.18785 10.113 4.27686 10.2462 4.38908 10.3584L10.239 16.2087C10.3513 16.3209 10.4845 16.4099 10.6311 16.4707C10.7777 16.5314 10.9349 16.5627 11.0936 16.5627C11.2523 16.5627 11.4095 16.5314 11.5561 16.4707C11.7027 16.4099 11.836 16.3209 11.9482 16.2087L23.6466 4.5081C23.8731 4.28143 24.0003 3.97408 24.0003 3.65364C24.0002 3.3332 23.8729 3.02589 23.6463 2.79931Z"
                    fill="#D5A15B"
                  />
                  <path
                    d="M21.0369 10.5439C20.7164 10.5439 20.4091 10.6712 20.1825 10.8978C19.9559 11.1245 19.8285 11.4318 19.8285 11.7523V20.7055H2.41674V3.29369H16.2034C16.8709 3.29369 17.4118 2.75283 17.4118 2.08532C17.4118 1.76484 17.2845 1.45749 17.0579 1.23088C16.8313 1.00426 16.5239 0.876953 16.2034 0.876953H1.20837C0.88789 0.876953 0.580537 1.00426 0.353923 1.23088C0.12731 1.45749 0 1.76484 0 2.08532L0 21.9139C0 22.2343 0.12731 22.5417 0.353923 22.7683C0.580537 22.9949 0.88789 23.1222 1.20837 23.1222H21.0369C21.7044 23.1222 22.2453 22.5814 22.2453 21.9139V11.7523C22.2453 11.4318 22.118 11.1245 21.8914 10.8978C21.6647 10.6712 21.3574 10.5439 21.0369 10.5439Z"
                    fill="#D5A15B"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_845_22027">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>

            {/* Feature Text */}
            <span className="text-gray-600 xl:text-lg font-medium">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureContent;
