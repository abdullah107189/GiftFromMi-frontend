import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface DropdownOption {
  label: string;
  value: string;
}

interface SharedDropdownProps {
  options: DropdownOption[];
  selectedValue?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  triggerIcon?: React.ReactNode; // শুধুমাত্র আইকন দেখানোর জন্য
}

export default function SharedDropdown({
  options,
  selectedValue,
  onValueChange,
  placeholder = "Select Option",
  className,
  triggerIcon,
}: SharedDropdownProps) {
  const selectedLabel =
    options.find((opt) => opt.value === selectedValue)?.label || placeholder;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "flex items-center justify-center outline-none transition-all",
            // যদি triggerIcon থাকে তবে গোল বাটন, না থাকলে বড় ফিল্টার বাটন
            triggerIcon
              ? "p-2 hover:bg-gray-100 rounded-full w-9 h-9"
              : "px-4 py-2 bg-white border border-gray-200 rounded-xl text-[#5C5C5C] text-sm font-medium min-w-[200px] justify-between",
            className
          )}
        >
          {/* ২ ধরনের বাটনের জন্য লজিক */}
          {triggerIcon ? (
            <div className="flex items-center justify-center">
              {triggerIcon}
            </div>
          ) : (
            <>
              <span className="truncate">{selectedLabel}</span>
              <ChevronDown className="ml-2 h-4 w-4 opacity-50 shrink-0" />
            </>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-[271px] p-2 bg-white rounded-[16px] shadow-xl border-none"
      >
        {options.map((option) => {
          const isActive = selectedValue === option.value;
          const isCancel = option.label.toLowerCase().includes("cancel");

          return (
            <DropdownMenuItem
              key={option.value}
              onClick={() => onValueChange(option.value)}
              className={cn(
                "flex items-center justify-between px-4 py-2 my-1 cursor-pointer outline-none transition-colors",
                isActive
                  ? "bg-[#FAF3EB] text-[#CA8A32] rounded-[58px] font-semibold"
                  : isCancel
                  ? "text-red-500 hover:bg-red-50 rounded-lg"
                  : "text-[#5C5C5C] hover:bg-gray-50 rounded-lg"
              )}
            >
              <span className="text-[14px]">{option.label}</span>
              {isActive && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M2.5 11.1111C2.5 11.1111 3.75 11.6667 5.41667 14.1667C5.41667 14.1667 5.65404 13.766 6.10111 13.1272M14.1667 5C12.2571 5.95481 10.2599 7.95984 8.65658 9.85192"
                    stroke="#CA8A32"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6.66797 11.1111C6.66797 11.1111 7.91797 11.6667 9.58464 14.1667C9.58464 14.1667 14.168 7.08333 18.3346 5"
                    stroke="#CA8A32"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
