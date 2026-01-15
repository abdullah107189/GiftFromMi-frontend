import { cn } from "@/lib/utils";
import { type StatCard as StatCardType } from "@/types/dashboard";

interface StatCardProps {
  data: StatCardType;
}

const variantStyles = {
  purple: {
    bg: "bg-[#F3E8FF]",
    icon: "text-[#9810FA]",
  },
  green: {
    bg: "bg-[#DCFCE7]",
    icon: "text-[#00A63E]",
  },
  cyan: {
    bg: "bg-[#09D5D529]",
    icon: "text-[#09D5D5]",
  },
  orange: {
    bg: "bg-[#FFEDD4]",
    icon: "text-[#F54900]",
  },
};

export default function StatCard({ data }: StatCardProps) {
  const styles = variantStyles[data.variant] || variantStyles.purple;
  const Icon = data.iconName;

  return (
    <div
      className={cn(
        "flex flex-col items-start gap-2 flex-1 border border-gray-200 p-[24px_24px_24px_14px] shadow-[0_0_40px_0_rgba(213,161,91,0.40)_inset] bg-background"
      )}
      style={{ borderRadius: "14px" }}
    >
      <div className="flex items-start justify-between w-full">
        <p className="text-gray-900 tracking-tight">{data.title}</p>
        <div className={cn("p-2 rounded-lg shrink-0", styles.bg, styles.icon)}>
          <Icon size={24} />
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full">
        <h3 className="xl:text-3xl md:text-2xl text-xl font-semibold text-gray-900">
          {data.value}
        </h3>

        <div className="flex  gap-1">
          {data.change && (
            <p
              className={cn(
                "text-sm ",
                data.trend === "up"
                  ? "text-[#12B76A]"
                  : data.trend === "down"
                  ? "text-[#F04438]"
                  : "text-[#667085]"
              )}
            >
              {data.change} <span className=""></span>
            </p>
          )}

          {data.description && (
            <p
              className={cn(
                "text-sm ",
                data.trend === "up"
                  ? "text-[#12B76A]"
                  : data.trend === "down"
                  ? "text-[#F04438]"
                  : "text-[#667085]"
              )}
            >
              {data.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
