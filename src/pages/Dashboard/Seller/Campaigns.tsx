import CampaignsGrid from "@/components/Dashboard/Seller/Campaigns/CampaignsGrid";
import CampaignsHeader from "@/components/Dashboard/Seller/Campaigns/CampaignsHeader";
import { StatCards } from "@/components/Dashboard/Seller/Campaigns/StatCards";

function Campaigns() {
  return (
    <div>
      <CampaignsHeader></CampaignsHeader>
      <StatCards></StatCards>

      <CampaignsGrid />
    </div>
  );
}

export default Campaigns;
