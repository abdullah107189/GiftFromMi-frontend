import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-[3px] cursor-pointer [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[linear-gradient(96deg,#D0A15A_5.18%,#C57200_96.62%)] text-white",
        outline:
          "border bg-transparent text-primary border-primary hover:bg-primary hover:text-white",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
        secondary: "bg-primary text-primary-foreground",
        ghost: "hover:bg-primary-50",
        accent: "bg-primary-50 text-primary border border-gray-200 ",
        ModalAccent:
          "bg-primary-50 text-primary border border-gray-200 xl:px-6! xl:py-3! md:py-4! md:py-2! py-3! py-2!",
        ModalActive:
          "bg-primary text-primary-foreground xl:px-6! xl:py-3! md:py-4! md:py-2! py-3! py-2!",
        link: "text-primary underline-offset-4 hover:underline",
      },

      // ✅ auto responsive sizes
      size: {
        default:
          "h-auto md:rounded-2xl rounded-xl px-4 py-2 text-sm md:px-6 md:py-3 md:text-base xl:px-8 xl:py-4",
        sm: "h-auto rounded-lg px-3 py-1.5 text-sm md:px-4 md:py-2",
        lg: "h-auto rounded-xl px-6 py-3 text-base md:px-8 md:py-4",
        icon: "rounded-full w-10 h-10 p-0 flex items-center justify-center",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface ButtonProps
  extends React.ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  showIcon?: boolean;
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  showIcon = false,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
      {showIcon && (
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
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </Comp>
  );
}

export { Button, buttonVariants };
