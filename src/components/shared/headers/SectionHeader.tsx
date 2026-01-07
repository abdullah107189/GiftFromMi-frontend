import type { ISectionHeaderProps } from "@/types";
import React from "react";

export const SectionHeader: React.FC<ISectionHeaderProps> = ({
  title,
  subtitle,
  centered = true,
}) => {
  return (
    <div className={`lg:my-8 ${centered ? "text-center" : "text-left"}`}>
      <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 tracking-tight mb-4">
        {title}
      </h2>
      <p className="text-lg md:text-xl text-gray-600 w-[90%] mx-auto leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
};
