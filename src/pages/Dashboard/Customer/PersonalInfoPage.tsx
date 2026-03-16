import SEO from "@/components/shared/SEO";
import { Button } from "@/components/ui/button";
import ViewProfile from "@/components/Dashboard/Customer/PersonalInfo/ViewProfile";
import { useGetSingleUserQuery } from "@/redux/features/user/user.api";
import ViewProfileSkeleton from "@/components/shared/loadingEffect/ViewProfileSkeleton";

const PersonalInfoPage = () => {
  const {
    data: profileResponse,
    isLoading,
    isError,
    refetch,
  } = useGetSingleUserQuery(undefined);

  if (isLoading) return <ViewProfileSkeleton></ViewProfileSkeleton>;

  return (
    <div>
      <SEO
        title="My Profile"
        description="View your personal information and account details."
      />
      {isError || !profileResponse?.data ? (
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.08)] md:p-10">
          <div className="max-w-xl space-y-3">
            <h1 className="text-2xl font-semibold text-slate-900">
              We could not load your profile
            </h1>
            <p className="text-sm leading-6 text-slate-600">
              Please refresh the page and try again. If the problem keeps
              happening, the API response for `/user-detail` should be checked.
            </p>
            <Button type="button" onClick={() => refetch()}>
              Try Again
            </Button>
          </div>
        </div>
      ) : (
        <ViewProfile profile={profileResponse.data} />
      )}
    </div>
  );
};

export default PersonalInfoPage;
