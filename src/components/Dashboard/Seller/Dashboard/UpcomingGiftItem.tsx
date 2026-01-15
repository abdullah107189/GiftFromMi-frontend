import type { UpcomingGift } from "@/types/dashboard";

interface UpcomingGiftItemProps {
  gift: UpcomingGift;
}

export default function UpcomingGiftItem({ gift }: UpcomingGiftItemProps) {
  return (
    <div className="flex justify-between rounded-2xl px-3 pt-3">
      <div className="flex gap-3">
        <div className="flex w-10 h-10 justify-center items-center bg-primary-50 rounded-[10px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M16.6667 6.66602H3.33333C2.8731 6.66602 2.5 7.03911 2.5 7.49935V9.16602C2.5 9.62625 2.8731 9.99935 3.33333 9.99935H16.6667C17.1269 9.99935 17.5 9.62625 17.5 9.16602V7.49935C17.5 7.03911 17.1269 6.66602 16.6667 6.66602Z"
              stroke="#CA8A32"
              stroke-width="1.66667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10 6.66602V17.4993"
              stroke="#CA8A32"
              stroke-width="1.66667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M15.8327 10V15.8333C15.8327 16.2754 15.6571 16.6993 15.3445 17.0118C15.032 17.3244 14.608 17.5 14.166 17.5H5.83268C5.39065 17.5 4.96673 17.3244 4.65417 17.0118C4.34161 16.6993 4.16602 16.2754 4.16602 15.8333V10"
              stroke="#CA8A32"
              stroke-width="1.66667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6.24935 6.66703C5.69681 6.66703 5.16691 6.44754 4.77621 6.05684C4.38551 5.66614 4.16602 5.13623 4.16602 4.5837C4.16602 4.03116 4.38551 3.50126 4.77621 3.11056C5.16691 2.71986 5.69681 2.50036 6.24935 2.50036C7.05325 2.48636 7.84104 2.87641 8.50996 3.61966C9.17889 4.36292 9.69791 5.42487 9.99935 6.66703C10.3008 5.42487 10.8198 4.36292 11.4887 3.61966C12.1577 2.87641 12.9454 2.48636 13.7493 2.50036C14.3019 2.50036 14.8318 2.71986 15.2225 3.11056C15.6132 3.50126 15.8327 4.03116 15.8327 4.5837C15.8327 5.13623 15.6132 5.66614 15.2225 6.05684C14.8318 6.44754 14.3019 6.66703 13.7493 6.66703"
              stroke="#CA8A32"
              stroke-width="1.66667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div>
          <h4 className="text-gray-900">{gift.recipient}</h4>
          <p className="text-sm text-[#6A7282]">{gift.gift}</p>
          <p className="text-sm text-[#6A7282] flex gap-1 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                d="M4 1V3"
                stroke="#6A7282"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8 1V3"
                stroke="#6A7282"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.5 2H2.5C1.94772 2 1.5 2.44772 1.5 3V10C1.5 10.5523 1.94772 11 2.5 11H9.5C10.0523 11 10.5 10.5523 10.5 10V3C10.5 2.44772 10.0523 2 9.5 2Z"
                stroke="#6A7282"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M1.5 5H10.5"
                stroke="#6A7282"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            {gift.date}
          </p>
        </div>
      </div>
      <div>
        <p className="flex justify-center items-center gap-1 shrink-0 py-1 px-2 rounded-2xl bg-[#FAF3EB] text-primary text-xs">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
          >
            <g clip-path="url(#clip0_1126_28104)">
              <path
                d="M6 3V6L8 7"
                stroke="#CA8A32"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11Z"
                stroke="#CA8A32"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_1126_28104">
                <rect width="12" height="12" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <span>{gift.duration}</span>
        </p>
      </div>
    </div>
  );
}
