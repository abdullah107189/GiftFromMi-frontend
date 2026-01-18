import type { FC } from "react";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CalendarEvent } from "./EventDashboard";

interface EventListProps {
  events: CalendarEvent[];
}

const EventList: FC<EventListProps> = ({ events }) => {
  return (
    <div className="rounded-2xl shadow-[0_0_4px_0_rgba(0,0,0,0.16)] md:p-6 p-4 bg-white">
      <div className="flex items-center gap-3 xl:mb-8 md:mb-6 mb-4 rounded-2xl text-sm">
        <div className="p-2 bg-purple-100 rounded-xl text-purple-600">
          <CalendarIcon className="h-5 w-5" />
        </div>
        <span className="text-gray-800">Dec 25, 2024</span>
      </div>
      <div className="space-y-4">
        {events.map((event, idx) => (
          <div key={event.id || idx} className="group relative">
            <div className="flex items-start gap-4 rounded-3xl transition-all hover:bg-gray-50/50">
              {/* Avatar / Initials */}
              <div
                className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 shadow-sm",
                  event.type === "birthday"
                    ? "bg-orange-50 text-orange-600"
                    : event.type === "holiday"
                      ? "bg-green-50 text-green-600"
                      : "bg-purple-50 text-purple-600",
                )}
              >
                {event.initials}
              </div>

              {/* Event Info */}
              <div className="flex-1 space-y-1">
                <h4 className="text-gray-900 text-sm leading-tight">
                  {event.name}
                </h4>
                <p className="text-gray-500 text-xs">{event.description}</p>
                <div className="flex items-center gap-1.5 text-gray-400 pt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_1126_28910)">
                      <path
                        d="M6 3V6L8 7"
                        stroke="#6A7282"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11Z"
                        stroke="#6A7282"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1126_28910">
                        <rect width="12" height="12" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span className="text-gray-500 text-xs">{event.time}</span>
                </div>
              </div>

              {/* Badge / Type */}
              <span
                className={cn(
                  "px-2 py-0.5 rounded-xl text-xs",
                  event.type === "birthday"
                    ? "bg-[#FFEDD4] text-[#CA3500]"
                    : event.type === "holiday"
                      ? "bg-[#DCFCE7] text-[#008236]"
                      : "bg-purple-50 text-purple-500",
                )}
              >
                {event.type}
              </span>
            </div>

            {/* Divider */}
            {idx !== events.length - 1 && (
              <div className="h-px bg-gray-50 mx-4 mt-2" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
