import React from "react";

interface GradientOutlineProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
  width?: number;
  height?: number;
}

const GradientOutline: React.FC<GradientOutlineProps> = ({
  children,
  type = "button",
  onClick,
  disabled = false,
  className = "",
  width = 260,
  height = 64,
}) => {

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex bg-transparent border-none p-0 cursor-pointer disabled:cursor-not-allowed ${className}`}
      aria-disabled={disabled}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient
            id="orange-gradient-outline"
            x1="5.18%"
            y1="0%"
            x2="96.62%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#d0a15a" />
            <stop offset="100%" stopColor="#c57200" />
          </linearGradient>
        </defs>

        {/* Border */}
        <rect
          x="2"
          y="2"
          width={width - 4}
          height={height - 4}
          rx={16} // radius fixed to 16px as per your requirement
          fill="none"
          stroke="url(#orange-gradient-outline)"
          strokeWidth="2"
        />

        {/* Text */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="16"
          fontFamily="Inter, sans-serif"
          fontWeight="500"
          fill="#c57200"
          pointerEvents="none"
        >
          {children}
        </text>
      </svg>
    </button>
  );
};

export default GradientOutline;
