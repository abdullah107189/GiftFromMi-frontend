import { cn } from "@/lib/utils";

interface SetupProgressProps {
  percentage: number;
  className?: string;
}

export const SetupProgress = ({
  percentage,
  className,
}: SetupProgressProps) => {
  return (
    <div
      className={cn(
        "bg-primary-50 rounded-lg p-2 flex items-center gap-4 shadow-sm border border-orange-100",
        className
      )}
    >
      <div className="relative size-15 flex items-center justify-center shrink-0">
        <svg className="size-full -rotate-90" viewBox="0 0 36 36">
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            className="stroke-primary"
            strokeWidth="4"
          />
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            className="stroke-[#9C4900]"
            strokeWidth="4"
            strokeDasharray={`${percentage}, 100`}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute text-[14px] font-bold text-gray-900">
          {percentage}%
        </span>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-900">
          {percentage}% Account Setup Complete
        </p>
        <p className="text-xs text-gray-700 mt-0.5">
          Continue to unlock all features
        </p>
      </div>
    </div>
  );
};
