
import SEO from "@/components/shared/SEO";
import { useGetProfileQuery } from "@/redux/features/profile/profile.api";
import EditProfileForm from "@/components/Dashboard/Customer/PersonalInfo/EditProfileForm";

const PersonalInfoPage = () => {
  const { data: profile } = useGetProfileQuery(undefined);
  console.log('profile........', profile?.data);
  return (
    <div><SEO title="My Profile" description="Update your personal information and profile settings." />
      <EditProfileForm profile={profile?.data} />
    </div>
  );
};

export default PersonalInfoPage;
