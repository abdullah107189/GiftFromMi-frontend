import SEO from "@/components/shared/SEO";
import { useGetProfileQuery } from "@/redux/features/profile/profile.api";
import ProfileFormSkeleton from "@/components/Dashboard/Customer/PersonalInfo/ProfileFormSkeleton";
import ViewProfile from "@/components/Dashboard/Customer/PersonalInfo/ViewProfile";

const ViewProfilePage = () => {
  const { data: profile, isLoading } = useGetProfileQuery(undefined);

  if (isLoading) return <ProfileFormSkeleton></ProfileFormSkeleton>;
  console.log(profile?.data)
  return (
    <div>
      <SEO
        title="My Profile"
        description="View your personal information and profile details."
      />
      {profile?.data ? <ViewProfile profile={profile?.data} /> : null}
    </div>
  );
};

export default ViewProfilePage;
