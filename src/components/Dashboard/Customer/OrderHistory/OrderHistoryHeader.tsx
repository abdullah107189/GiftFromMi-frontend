import SharedDropdown from "@/components/shared/SharedDropdown";
import { Calendar } from "lucide-react";
import { useState } from "react";

const monthOptions = [
  { label: "Previous Month", value: "previous" },
  { label: "12 Nov 2025", value: "12 Nov 2025" },
  { label: "4 Oct 2025", value: "4 Oct 2025" },
];

export default function OrderHistoryHeader() {
  const [filter, setFilter] = useState("previous");

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      <div>
        <h2 className="text-3xl font-semibold text-gray-900">
          {filter === "previous" ? "Previous Month Orders" : ""}
        </h2>
        <p className="text-[#64748B] text-sm md:mt-4 mt-2">
          Review your last month's orders and reorder products instantly.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <SharedDropdown
          options={monthOptions}
          selectedValue={filter}
          onValueChange={(val) => setFilter(val)}
          className="bg-[#F8FAFC] border border-gray-100 rounded-xl px-4 py-2 h-11 min-w-[180px]"
          triggerIcon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M13.3346 1.6665V4.99984M6.66797 1.6665V4.99984" stroke="#364153" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M10.8333 3.3335H9.16667C6.02397 3.3335 4.45262 3.3335 3.47631 4.3098C2.5 5.28612 2.5 6.85746 2.5 10.0002V11.6668C2.5 14.8095 2.5 16.3809 3.47631 17.3572C4.45262 18.3335 6.02397 18.3335 9.16667 18.3335H10.8333C13.976 18.3335 15.5474 18.3335 16.5237 17.3572C17.5 16.3809 17.5 14.8095 17.5 11.6668V10.0002C17.5 6.85746 17.5 5.28612 16.5237 4.3098C15.5474 3.3335 13.976 3.3335 10.8333 3.3335Z" stroke="#364153" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M2.5 8.3335H17.5" stroke="#364153" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M9.99755 11.6665H10.0051M9.99755 14.9998H10.0051M13.3271 11.6665H13.3346M6.66797 11.6665H6.67544M6.66797 14.9998H6.67544" stroke="#364153" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>}
        />
      </div>
    </div>
  );
}
