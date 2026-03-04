/* eslint-disable @typescript-eslint/no-explicit-any */
// components/ui/SharedSearchableSelect.tsx
import * as React from "react";
import Select, { type SingleValue, components } from "react-select";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface OptionType {
  readonly label: string;
  readonly value: string;
}

interface SharedSearchableSelectProps {
  options: readonly OptionType[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  isClearable?: boolean;
  isDisabled?: boolean;
  error?: string;
  label?: string;
  required?: boolean;
}

export function SharedSearchableSelect({
  options,
  value,
  onChange,
  placeholder = "Select option...",
  className,
  isClearable = false,
  isDisabled = false,
  error,
  label,
  required = false,
}: SharedSearchableSelectProps) {
  const selectedOption = React.useMemo(
    () => options.find((opt) => opt.value === value) ?? null,
    [options, value],
  );

  // Custom Option component যাতে selected হলে tick icon দেখায়
  const CustomOption = (props: any) => {
    const { isSelected } = props;

    return (
      <components.Option {...props}>
        <div className="flex items-center justify-between w-full">
          <span className="text-[14px]">{props.label}</span>
          {isSelected && (
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
        </div>
      </components.Option>
    );
  };

  return (
    <div className={cn("space-y-2")}>
      {label && (
        <label className="text-[18px] font-medium text-gray-900 flex items-center gap-1">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <Select
        options={options}
        value={selectedOption}
        onChange={(newValue: SingleValue<OptionType>) =>
          onChange(newValue?.value ?? "")
        }
        placeholder={placeholder}
        isSearchable
        isClearable={isClearable}
        isDisabled={isDisabled}
        unstyled
        components={{
          Option: CustomOption,
          DropdownIndicator: () => (
            <ChevronDown className="h-4 w-4 opacity-50 shrink-0" />
          ),
          IndicatorSeparator: () => null,
        }}
        classNames={{
          control: ({ isFocused, isDisabled }) =>
            cn(
              "bg-[#F0F1F1] border border-[#EBECF0] rounded-2xl",
              "min-h-[60px] md:min-h-[72px]",
              "px-4 md:px-6 ",
              "flex items-center cursor-pointer",
              "text-base text-gray-900",
              isFocused && "ring-1 ring-primary border-primary/60 shadow-sm",
              isDisabled && "opacity-60 cursor-not-allowed",
              error && "border-red-400 focus-within:border-red-400",
              className,
            ),

          valueContainer: () => "flex items-center gap-2 py-1 md:py-2",

          singleValue: () => "text-[#5C5C5C] text-base truncate",

          placeholder: () => "text-[#5C5C5C] text-base",

          input: () => "text-base text-gray-900",

          menu: () =>
            "bg-white rounded-2xl mt-1 border border-gray-100 shadow-none z-50",

          menuList: () => "p-2 max-h-[320px] overflow-y-auto",

          option: ({ isFocused, isSelected }) =>
            cn(
              "cursor-pointer transition-colors rounded-lg my-1",
              isSelected
                ? "bg-primary-50 text-primary p-2"
                : isFocused
                  ? "bg-primary-50 text-primary p-2"
                  : "text-[#5C5C5C] hover:bg-primary-50 p-2",
            ),

          indicatorsContainer: () => "flex items-center px-2 text-gray-400",

          dropdownIndicator: () => "p-1",

          clearIndicator: () => "p-1 hover:text-red-500 transition-colors",

          noOptionsMessage: () => "py-6 text-gray-500 text-sm text-center",
        }}
      />

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}
