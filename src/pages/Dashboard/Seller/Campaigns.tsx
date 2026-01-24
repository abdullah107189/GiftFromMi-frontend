import CampaignsGrid from "@/components/Dashboard/Seller/Campaigns/CampaignsGrid";
import CampaignsHeader from "@/components/Dashboard/Seller/Campaigns/CampaignsHeader";
import { StatCards } from "@/components/Dashboard/Seller/Campaigns/StatCards";
import SEO from "@/components/shared/SEO";

function Campaigns() {
  return (
    <div>
      <SEO
        title="Campaigns"
        description="Manage your marketing and gifting campaigns."
      />
      <CampaignsHeader></CampaignsHeader>
      <StatCards></StatCards>

      <CampaignsGrid />
    </div>
  );
}

export default Campaigns;
