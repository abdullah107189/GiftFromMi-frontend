
import SEO from "@/components/shared/SEO";
import { useGetProfileQuery } from "@/redux/features/profile/profile.api";
import EditProfileForm from "@/components/Dashboard/Customer/PersonalInfo/EditProfileForm";
import ProfileFormSkeleton from "@/components/Dashboard/Customer/PersonalInfo/ProfileFormSkeleton";

const PersonalInfoPage = () => {
  const { data: profile, isLoading } = useGetProfileQuery(undefined);
  if (isLoading) return <ProfileFormSkeleton></ProfileFormSkeleton>;
  console.log('profile........', profile?.data);
  return (
    <div><SEO title="My Profile" description="Update your personal information and profile settings." />
      <EditProfileForm profile={profile?.data} />
    </div>
  );
};

export default PersonalInfoPage;
