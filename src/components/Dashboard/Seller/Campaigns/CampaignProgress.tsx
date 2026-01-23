import { cn } from "@/lib/utils";
import { clampPercent } from "@/data/mockData";

export default function CampaignProgress({
  progress,
  barClassName,
  barBgClassName,
}: {
  progress: number;
  barClassName: string;
  barBgClassName: string;
}) {
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between">
        <span className="text-gray-500 text-[12px]">Progress</span>
        <span className="text-gray-500 text-[12px]">
          {clampPercent(progress)}
        </span>
      </div>

      <div className={cn("h-2 rounded-full mt-2", barBgClassName)}>
        <div
          className={cn("h-2 rounded-full", barClassName)}
          style={{ width: clampPercent(progress) }}
        />
      </div>
    </div>
  );
}
