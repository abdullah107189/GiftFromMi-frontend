import { demoCampaigns, type DropdownOption } from "@/data/mockData";
import type { Campaign } from "@/types";
import CampaignCard from "./CampaignCard";

export default function CampaignsGrid({
  data = demoCampaigns,
}: {
  data?: Campaign[];
}) {
  const actions: DropdownOption[] = [
    { label: "Edit Campaign", value: "edit" },
    { label: "Pause Campaign", value: "pause" },
    { label: "Delete", value: "delete" },
  ];

  const handleAction = (campaignId: string, actionValue: string) => {
    console.log("campaign:", campaignId, "action:", actionValue);
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {data.map((c) => (
          <CampaignCard
            key={c.id}
            campaign={c}
            actions={actions}
            onAction={handleAction}
          />
        ))}
      </div>
    </div>
  );
}
