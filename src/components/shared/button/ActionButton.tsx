import React from "react";
import { cn } from "@/lib/utils";

interface ActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icons?: boolean;
  variant?: "primary" | "outline"; // নতুন ভ্যারিয়েন্ট যোগ করা হলো
  className?: string;
}

const ActionButton = ({
  children,
  variant = "primary",
  icons = false,
  className,
  ...props
}: ActionButtonProps) => {
  // ভ্যারিয়েন্ট অনুযায়ী স্টাইল সিলেক্ট করা
  const variantStyles =
    variant === "primary"
      ? "bg-[linear-gradient(96deg,#D0A15A_5.18%,#C57200_96.62%)] text-white border-none"
      : "bg-transparent border border-[#D0A15A] text-[#D0A15A]";

  return (
    <button
      className={cn(
        "flex items-center justify-center cursor-pointer transition-all active:scale-95",
        "px-8 py-4 gap-2.5 rounded-3xl",
        "font-medium text-base",
        variantStyles,
        className
      )}
      {...props}
    >
      {children}
      <div className={`${icons ? "ml-2.5" : "hidden"}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M14 5L21 12M21 12L14 19M21 12H3"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </button>
  );
};

export default ActionButton;
