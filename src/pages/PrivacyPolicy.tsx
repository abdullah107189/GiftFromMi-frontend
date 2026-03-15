import PageLoader from "@/components/shared/PageLoader";
import { usePrivacyPolicyQuery } from "@/redux/features/public/public.api";

const PrivacyPolicy = () => {
  const { data: privacy_policy, isLoading: isPrivacyPolicyLoading } =
    usePrivacyPolicyQuery(undefined);
  if (isPrivacyPolicyLoading) {
    return <PageLoader></PageLoader>;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-40 ">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <div
        className="prose lg:prose-lg max-w-none"
        dangerouslySetInnerHTML={{
          __html: privacy_policy?.privacy_policy || "",
        }}
      />
    </div>
  );
};

export default PrivacyPolicy;
