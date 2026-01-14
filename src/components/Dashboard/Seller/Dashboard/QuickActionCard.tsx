import { cn } from "@/lib/utils";
import type { QuickAction } from "@/types/dashboard";

interface QuickActionCardProps {
  action: QuickAction;
}

export default function QuickActionCard({ action }: QuickActionCardProps) {
  const isHighlight = action.variant === "highlight";

  return (
    <div
      className={cn(
        "flex flex-col gap-4 p-6 rounded-xl cursor-pointer transition-all duration-200 border ",
        isHighlight
          ? "bg-[linear-gradient(96deg,#D0A15A_5.18%,#C57200_96.62%)] text-white "
          : "bg-gray-50 border-gray-200 hover:bg-gray-100"
      )}
    >
      <action.icon
        className={cn("size-6", isHighlight ? "text-white" : "text-[#1B1D1E]")}
      />

      <div>
        <h4
          className={cn(
            "text-sm font-semibold",
            isHighlight ? "text-white" : "text-gray-900 "
          )}
        >
          {action.title}
        </h4>
        <p
          className={cn(
            "text-sm mt-1",
            isHighlight ? "text-white" : "text-gray-500"
          )}
        >
          {action.description}
        </p>
      </div>
    </div>
  );
}
