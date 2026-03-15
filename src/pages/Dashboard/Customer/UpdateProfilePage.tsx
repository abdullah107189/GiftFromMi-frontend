import SEO from "@/components/shared/SEO";
import EditProfileForm from "@/components/Dashboard/Customer/PersonalInfo/EditProfileForm";
import ProfileFormSkeleton from "@/components/Dashboard/Customer/PersonalInfo/ProfileFormSkeleton";
import { Button } from "@/components/ui/button";
import { useGetSingleUserQuery } from "@/redux/features/user/user.api";

const UpdateProfilePage = () => {
  const {
    data: profileResponse,
    isLoading,
    isError,
    refetch,
  } = useGetSingleUserQuery(undefined);

  if (isLoading) return <ProfileFormSkeleton></ProfileFormSkeleton>;

  return (
    <div>
      <SEO
        title="Update Profile"
        description="Update your personal information and profile settings."
      />
      {isError || !profileResponse?.data ? (
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.08)] md:p-10">
          <div className="max-w-xl space-y-3">
            <h1 className="text-2xl font-semibold text-slate-900">
              We could not load your profile form
            </h1>
            <p className="text-sm leading-6 text-slate-600">
              Please refresh the page and try again before updating your
              profile.
            </p>
            <Button type="button" onClick={() => refetch()}>
              Try Again
            </Button>
          </div>
        </div>
      ) : (
        <EditProfileForm profile={profileResponse.data} />
      )}
    </div>
  );
};

export default UpdateProfilePage;
