import React from 'react';
import { cn } from "@/lib/utils";

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'outline'; // নতুন ভ্যারিয়েন্ট যোগ করা হলো
  className?: string;
}

const ActionButton = ({ 
  children, 
  variant = 'primary', 
  className, 
  ...props 
}: ActionButtonProps) => {
  
  // ভ্যারিয়েন্ট অনুযায়ী স্টাইল সিলেক্ট করা
  const variantStyles = variant === 'primary' 
    ? "bg-[linear-gradient(96deg,#D0A15A_5.18%,#C57200_96.62%)] text-white border-none" 
    : "bg-transparent border border-[#D0A15A] text-[#D0A15A]";

  return (
    <button
      className={cn(
        "flex items-center justify-center cursor-pointer transition-all active:scale-95",
        "px-[32px] py-[16px] gap-[10px] rounded-[16px]", // আপনার দেওয়া প্যাডিং এবং রেডিয়াস
        "font-medium text-base",
        variantStyles,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default ActionButton;