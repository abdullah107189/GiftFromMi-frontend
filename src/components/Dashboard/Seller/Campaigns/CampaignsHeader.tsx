import { Plus } from "lucide-react";

export default function CampaignsHeader() {
  return (
    <div className="lg:flex w-full justify-between items-center">
      <div>
        <h1 className="text-gray-900 leading-tight">Campaigns</h1>
        <p className="text-[14px] text-gray-500 mt-0.5">
          Manage automated and bulk gifting campaigns
        </p>
      </div>

      <div className="flex items-center gap-3 mt-3 lg:mt-0">
        {/* New Order Button */}
        <button className="md:mb-6 mb-4 cursor-pointer flex p-[10px_20px] justify-center items-center gap-2.5 rounded-xl bg-primary hover:bg-[#b57a2d] transition-colors text-card">
          <Plus className="w-4 h-4" />
          <span className="text-[14px] font-medium">Create Campaign</span>
        </button>
      </div>
    </div>
  );
}
