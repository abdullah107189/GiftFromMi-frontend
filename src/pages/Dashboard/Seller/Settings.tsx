import { ProfileTabs } from "@/components/Dashboard/Seller/Settings/ProfileTabs";
import SettingsHeader from "@/components/Dashboard/Seller/Settings/SettingsHeader";
import SEO from "@/components/shared/SEO";

function Settings() {
  return (
    <div>
      <SEO
        title="Store Settings"
        description="Update your seller profile and store configurations."
      />
      <SettingsHeader></SettingsHeader>
      <ProfileTabs></ProfileTabs>
    </div>
  );
}

export default Settings;
