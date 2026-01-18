import { Download, Plus } from "lucide-react";

export default function SchudulingHeader() {
  return (
    <div className="lg:flex w-full justify-between items-center">
      <div>
        <h1 className="text-gray-900 leading-tight">Scheduling</h1>
        <p className="text-[14px] text-gray-500 mt-0.5">
          Schedule and manage recurring gifts
        </p>
      </div>

      <div className="flex items-center gap-3 mt-3 lg:mt-0">
        {/* Export Button */}
        <button
          className="cursor-pointer flex  p-2.5 justify-center items-center gap-3 rounded-xl border border-gray-200
          hover:bg-gray-50 transition-colors"
        >
          <Download className="w-4 h-4 text-gray-700" />
          <span className="text-[14px] font-medium text-gray-700 ">
            Import CSV
          </span>
        </button>

        {/* New Order Button */}
        <button className="md:mb-6 mb-4 cursor-pointer flex p-[10px_20px] justify-center items-center gap-2.5 rounded-xl bg-primary hover:bg-[#b57a2d] transition-colors text-card">
          <Plus className="w-4 h-4" />
          <span className="text-[14px] font-medium">Schedule Gift</span>
        </button>
      </div>
    </div>
  );
}
