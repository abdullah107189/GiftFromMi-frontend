import { Plus } from "lucide-react";
import { useState } from "react";
import CreateCampaignModal from "./CreateCampaignModal";

export default function CampaignsHeader() {
  const [isCreateCampaignModalOpen, setIsCreateCampaignModalOpen] =
    useState(false);
  return (
    <div className="lg:flex w-full justify-between items-center border-t border-gray-200 xl:pt-6 md:pt-4 pt-2 md:pb-4 pb-2">
      <div>
        <h1 className="text-gray-900 leading-tight">Campaigns</h1>
        <p className="text-[14px] text-gray-500 mt-0.5">
          Manage automated and bulk gifting campaigns
        </p>
      </div>

      <div className="flex items-center gap-3 mt-3 lg:mt-0">
        {/* New Order Button */}
        <button
          onClick={() => setIsCreateCampaignModalOpen(true)}
          className="cursor-pointer flex p-[10px_20px] justify-center items-center gap-2.5 rounded-xl bg-primary hover:bg-[#b57a2d] transition-colors text-card"
        >
          <Plus className="w-4 h-4" />
          <span className="text-[14px] font-medium">Create Campaign</span>
        </button>
        <CreateCampaignModal
          isOpen={isCreateCampaignModalOpen}
          onClose={() => setIsCreateCampaignModalOpen(false)}
        ></CreateCampaignModal>
      </div>
    </div>
  );
}
