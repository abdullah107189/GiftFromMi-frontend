export const SetupProgress = ({ percentage }: { percentage: number }) => {
  return (
    <div className="bg-[#FDF8F1] rounded-2xl p-4 flex items-center gap-4 shadow-sm border border-orange-100">
      <div className="relative size-12 flex items-center justify-center">
        {/* SVG Circular Progress */}
        <svg className="size-full -rotate-90" viewBox="0 0 36 36">
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            className="stroke-[#E5D5C0]"
            strokeWidth="3"
          />
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            className="stroke-[#C88628]"
            strokeWidth="3"
            strokeDasharray={`${percentage}, 100`}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute text-[10px] font-bold text-[#6D4C25]">
          {percentage}%
        </span>
      </div>
      <div>
        <p className="text-sm font-bold text-[#1B1D1E]">
          {percentage}% Account Setup Complete
        </p>
        <p className="text-[11px] text-[#6D4C25]/70">
          Continue to unlock all features
        </p>
      </div>
    </div>
  );
};
