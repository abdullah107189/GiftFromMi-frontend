import React from "react";
import { cn } from "@/lib/utils";
import "./ActionButton.css";

interface ActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icons?: boolean;
  variant?: "primary" | "outline";
  className?: string;
}

const ActionButton = ({
  children,
  variant = "primary",
  icons = false,
  className,
  ...props
}: ActionButtonProps) => {
  const variantStyles = variant === "primary" ? "" : "action-button-outline";

  return (
    <button
      className={cn(
        "flex items-center justify-center cursor-pointer transition-all active:scale-95",
        "px-8 py-4 gap-2.5 rounded-[16px]",
        "font-medium text-base",
        variantStyles,
        className
      )}
      {...props}
    >
      {variant === "outline" ? (
        <span className="flex items-center justify-center gap-2.5">
          <>
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
          </>
        </span>
      ) : (
        <>
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
        </>
      )}
    </button>
  );
};

export default ActionButton;
