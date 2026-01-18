interface PlanCardProps {
  currentUsage?: number;
  monthlyLimit?: number;
  planName?: string;
  renewalDate?: string;
  billingAmount?: number;
  planStatus?: string;
}

export const PlanCard = ({
  currentUsage = 500,
  monthlyLimit = 500,
  planName = "Professional Plan",
  renewalDate = "January 1, 2025",
  billingAmount = 249,
  planStatus = "ACTIVE",
}: PlanCardProps) => {
  const progressPercentage = (currentUsage / monthlyLimit) * 100;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0_0_4px_0_rgba(0,0,0,0.16)] flex flex-col w-full justify-between items-center gap-4">
      <div className="lg:flex items-center justify-between w-full">
        <div className="">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-gray-900">{planName}</h2>
            <span className="bg-primary-100 text-primary px-2 py-0.5 rounded-md text-[10px] font-bold">
              {planStatus}
            </span>
          </div>
          <p className="text-sm text-gray-500 md:mb-6 mb-4">
            Your subscription renews on {renewalDate}
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button className="px-4 py-2 rounded-[10px] border border-gray-200 text-sm">
            Change Plan
          </button>
          <button className="px-4 py-2 rounded-[10px] border border-gray-200 text-sm bg-[#DF1C41] text-white">
            Cancel Subscription
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between md:gap-6 gap-4 pt-4 md:min-w-1/2 mr-auto">
        <div className="w-full">
          <div className="flex flex-col gap-2 text-sm mb-2">
            <span className="text-gray-700 text-sm">Monthly Limit</span>
            <span className="text-gray-900">
              {currentUsage} /{" "}
              <span className="text-gray-400">{monthlyLimit} gifts</span>
            </span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="bg-primary h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
        <div className="w-full">
          <p className="text-gray-700 text-sm mb-1">Current Billing</p>
          <p className="text-gray-900 ">
            ${billingAmount}
            <span className="text-gray-400 text-sm ">/ month</span>
          </p>
        </div>
      </div>
    </div>
  );
};
