import { Download, Plus } from "lucide-react";

export default function OrdersHeader() {
  return (
    <div className="bg-background flex justify-between items-center self-stretch p-[8px_24px] rounded-2xl border border-gray-200">
      <div>
        <h1 className="text-gray-900 leading-tight">Orders</h1>
        <p className="text-[14px] text-gray-500 mt-0.5">
          Manage and track all your gift orders
        </p>
      </div>

      <div className="flex items-center gap-3">
        {/* Export Button */}
        <button
          className="cursor-pointer flex w-24.5 p-2.5 justify-center items-center gap-3 rounded-xl border border-gray-200
        hover:bg-gray-50 transition-colors"
        >
          <Download className="w-4 h-4 text-gray-700" />
          <span className="text-[14px] font-medium text-gray-700">Export</span>
        </button>

        {/* New Order Button */}
        <button className="cursor-pointer flex p-[10px_20px] justify-center items-center gap-2.5 rounded-xl bg-primary hover:bg-[#b57a2d] transition-colors text-card">
          <Plus className="w-4 h-4" />
          <span className="text-[14px] font-medium">New Order</span>
        </button>
      </div>
    </div>
  );
}
