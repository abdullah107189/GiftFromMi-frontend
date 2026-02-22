import type { Campaign } from "@/types";
import CampaignHeader from "./CampaignHeader";
import CampaignProgress from "./CampaignProgress";
import { statusStyles, type DropdownOption } from "@/data/mockData";

export default function CampaignCard({
  campaign,
  actions,
  onAction,
}: {
  campaign: Campaign;
  actions: DropdownOption[];
  onAction: (campaignId: string, actionValue: string) => void;
}) {
  const style = statusStyles[campaign.status];

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
      <CampaignHeader
        campaign={campaign}
        actions={actions}
        onAction={(actionValue) => onAction(campaign.id, actionValue)}
      />

      {/* stats */}
      <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M10.6673 14V12.6667C10.6673 11.9594 10.3864 11.2811 9.88627 10.781C9.38617 10.281 8.70789 10 8.00065 10H4.00065C3.29341 10 2.61513 10.281 2.11503 10.781C1.61494 11.2811 1.33398 11.9594 1.33398 12.6667V14"
              stroke="#99A1AF"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10.666 2.08594C11.2379 2.23418 11.7443 2.56811 12.1058 3.03531C12.4673 3.50251 12.6635 4.07653 12.6635 4.66727C12.6635 5.25801 12.4673 5.83203 12.1058 6.29923C11.7443 6.76643 11.2379 7.10036 10.666 7.2486"
              stroke="#99A1AF"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M14.666 13.9993V12.6659C14.6656 12.0751 14.4689 11.5011 14.1069 11.0341C13.7449 10.5672 13.2381 10.2336 12.666 10.0859"
              stroke="#99A1AF"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6.00065 7.33333C7.47341 7.33333 8.66732 6.13943 8.66732 4.66667C8.66732 3.19391 7.47341 2 6.00065 2C4.52789 2 3.33398 3.19391 3.33398 4.66667C3.33398 6.13943 4.52789 7.33333 6.00065 7.33333Z"
              stroke="#99A1AF"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <div className="flex flex-col-reverse gap-1">
            <span className="text-gray-500 text-[12px]">Recipients</span>
            <span className="text-gray-900 font-medium">
              {campaign.recipients}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <g clipPath="url(#clip0_1126_29333)">
              <path
                d="M9.69119 14.4577C9.71652 14.5208 9.76055 14.5747 9.81737 14.6121C9.87419 14.6494 9.94109 14.6685 10.0091 14.6668C10.0771 14.665 10.1429 14.6426 10.1977 14.6023C10.2526 14.5621 10.2938 14.506 10.3159 14.4417L14.6492 1.77503C14.6705 1.71596 14.6746 1.65203 14.6609 1.59073C14.6473 1.52943 14.6164 1.47329 14.572 1.42888C14.5276 1.38447 14.4715 1.35363 14.4102 1.33996C14.3489 1.32629 14.2849 1.33036 14.2259 1.3517L1.55919 5.68503C1.49485 5.70709 1.4388 5.74831 1.39857 5.80314C1.35833 5.85798 1.33584 5.92381 1.33409 5.9918C1.33235 6.05979 1.35145 6.12669 1.38883 6.18351C1.4262 6.24034 1.48007 6.28437 1.54319 6.3097L6.82986 8.4297C6.99698 8.49661 7.14882 8.59667 7.27623 8.72385C7.40364 8.85103 7.50398 9.00269 7.57119 9.1697L9.69119 14.4577Z"
                stroke="#99A1AF"
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14.5687 1.43164L7.27539 8.72431"
                stroke="#99A1AF"
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_1126_29333">
                <rect width="16" height="16" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <div className="flex flex-col-reverse gap-1">
            <span className="text-gray-500 text-[12px]">Gifts Sent</span>
            <span className="text-gray-900 font-medium">
              {campaign.giftsSent}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M5.33398 1.33398V4.00065"
              stroke="#99A1AF"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10.666 1.33398V4.00065"
              stroke="#99A1AF"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12.6667 2.66602H3.33333C2.59695 2.66602 2 3.26297 2 3.99935V13.3327C2 14.0691 2.59695 14.666 3.33333 14.666H12.6667C13.403 14.666 14 14.0691 14 13.3327V3.99935C14 3.26297 13.403 2.66602 12.6667 2.66602Z"
              stroke="#99A1AF"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M2 6.66602H14"
              stroke="#99A1AF"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <div className="flex flex-col-reverse gap-1">
            <span className="text-gray-500 text-[12px]">Start Date</span>
            <span className="text-gray-900 font-medium">
              {campaign.startDate}
            </span>
          </div>
        </div>
      </div>

      <CampaignProgress
        progress={campaign.progress}
        barClassName={style.bar}
        barBgClassName={style.barBg}
      />

      {/* trigger */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-[12px] text-gray-500">Trigger: {campaign.trigger}</p>
      </div>
    </div>
  );
}
