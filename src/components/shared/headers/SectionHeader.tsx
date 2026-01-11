import type { ISectionHeaderProps } from "@/types";
import React from "react";

export const SectionHeader: React.FC<ISectionHeaderProps> = ({
  title,
  subtitle,
  centered = true,
}) => {
  return (
    <header
      className={` py-5 md:py-10 xl:py-15  ${
        centered ? "text-center" : "text-left"
      }`}
    >
      <h2 className="text-2xl md:text-4xl xl:text-5xl font-semibold text-gray-900 tracking-tight mb-2  lg:mb-4">
        {title}
      </h2>
      <p className="md:text-lg xl:text-xl text-gray-700 w-[90%] mx-auto leading-relaxed">
        {subtitle}
      </p>
    </header>
  );
};
