import { Download, Plus } from "lucide-react";
import ExportOrdersModal from "./ExportOrdersModal";
import { useState } from "react";

export default function OrdersHeader() {
  const [isExportOpen, setIsExportOpen] = useState(false);
  return (
    <div className="bg-background lg:flex justify-between items-center  xl:p-[8px_24px] p-2 rounded-2xl border border-gray-200">
      <div>
        <h1 className="text-gray-900 leading-tight">Orders</h1>
        <p className="text-[14px] text-gray-500 mt-0.5">
          Manage and track all your gift orders
        </p>
      </div>

      <div className="flex items-center gap-3 mt-3 lg:mt-0">
        {/* Export Button */}
        <button
          onClick={() => setIsExportOpen(true)}
          className="cursor-pointer flex p-2.5 justify-center items-center gap-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          <Download className="w-4 h-4 text-gray-700" />
          <span className="text-[14px] font-medium text-gray-700">Export</span>
        </button>


        <ExportOrdersModal
          isOpen={isExportOpen}
          onClose={() => setIsExportOpen(false)}
        />

        {/* New Order Button */}
        <button className="cursor-pointer flex p-[10px_20px] justify-center items-center gap-2.5 rounded-xl bg-primary hover:bg-[#b57a2d] transition-colors text-card">
          <Plus className="w-4 h-4" />
          <span className="text-[14px] font-medium">New Order</span>
        </button>
      </div>
    </div>
  );
}
