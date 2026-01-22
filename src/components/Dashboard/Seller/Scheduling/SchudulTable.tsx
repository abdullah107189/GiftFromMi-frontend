import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { CalendarEvent } from "@/types/dashboard";
import { format } from "date-fns";

const upcoming: CalendarEvent[] = [
  {
    id: "1",
    recipient: "Emma Thompson ",
    gift: "Birthday Gift Box",
    time: "8:00 AM",
    date: new Date(2024, 11, 25),
    type: "birthday",
    initials: "ET",
  },
  {
    id: "2",
    recipient: "Robert Smith",
    gift: "Holiday Hamper",
    time: "10:00 AM",
    date: new Date(2024, 11, 25),
    type: "holiday",
    initials: "RS",
  },
  {
    id: "3",
    recipient: "Jennifer Brown",
    gift: "Anniversary Bundle",
    time: "2:00 PM",
    date: new Date(2024, 11, 26),
    type: "custom",
    initials: "JB",
  },
  {
    id: "4",
    recipient: "David Lee",
    gift: "Welcome Kit",
    time: "11:00 AM",
    date: new Date(2024, 11, 27),
    type: "custom",
    initials: "DL",
  },
  {
    id: "5",
    recipient: "Amanda White",
    gift: "Thank You Bundle",
    time: "3:00 PM",
    date: new Date(2024, 11, 28),
    type: "custom",
    initials: "AW",
  },
  {
    id: "6",
    recipient: "Chris Johnson",
    gift: "Client Appreciation",
    time: "9:00 AM",
    date: new Date(2024, 11, 30),
    type: "custom",
    initials: "CJ",
  },
];
export default function SchudulTable() {
  return (
    <div className="shadow-[0_0_4px_0_rgba(0,0,0,0.16)] mt-4 rounded-2xl!">
      <p className=" md:p-6 p-4  bg-white text-gray-900 text-[20px] rounded-2xl">
        Upcoming Scheduled Gifts
      </p>
      <Table className="border-collapse bg-white  rounded-2xl">
        <TableHeader className="bg-primary-50">
          <TableRow className="border-b hover:bg-transparent">
            <TableHead className="font-medium text-gray-500 whitespace-nowrap pl-5">
              Recipient
            </TableHead>
            <TableHead className="font-medium text-gray-500 whitespace-nowrap">
              Gift
            </TableHead>

            <TableHead className="font-medium text-gray-500 whitespace-nowrap">
              Date & Time
            </TableHead>

            <TableHead className="font-medium text-gray-500 whitespace-nowrap  ">
              Type
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className=" ">
          {upcoming.map((order) => (
            <TableRow
              key={order.id}
              className="border-b border-gray-200 hover:bg-primary-50/50 last:border-0 transition-colors group rounded-b-2xl"
            >
              <TableCell className="py-5 pl-5 max-w-50">
                <div className="flex flex-col">
                  <span
                    className="text-sm font-semibold text-gray-900 truncate"
                    title={order.recipient}
                  >
                    {order.recipient}
                  </span>
                </div>
              </TableCell>
              <TableCell className="py-5 text-gray-600 whitespace-nowrap">
                {order?.gift}
              </TableCell>

              <TableCell className=" ">
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="flex items-center gap-1.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M5.33398 1.33398V4.00065"
                        stroke="#6A7282"
                        strokeWidth="1.33333"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10.666 1.33398V4.00065"
                        stroke="#6A7282"
                        strokeWidth="1.33333"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12.6667 2.66602H3.33333C2.59695 2.66602 2 3.26297 2 3.99935V13.3327C2 14.0691 2.59695 14.666 3.33333 14.666H12.6667C13.403 14.666 14 14.0691 14 13.3327V3.99935C14 3.26297 13.403 2.66602 12.6667 2.66602Z"
                        stroke="#6A7282"
                        strokeWidth="1.33333"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2 6.66602H14"
                        stroke="#6A7282"
                        strokeWidth="1.33333"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-sm">
                      {/* date-fns formatting */}
                      {format(order.date, "MMM dd, yyyy")}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_1126_29018)">
                        <path
                          d="M8 4V8L10.6667 9.33333"
                          stroke="#6A7282"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8.00065 14.6673C11.6825 14.6673 14.6673 11.6825 14.6673 8.00065C14.6673 4.31875 11.6825 1.33398 8.00065 1.33398C4.31875 1.33398 1.33398 4.31875 1.33398 8.00065C1.33398 11.6825 4.31875 14.6673 8.00065 14.6673Z"
                          stroke="#6A7282"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1126_29018">
                          <rect width="16" height="16" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <span className="text-sm">{order.time}</span>
                  </div>
                </div>
              </TableCell>

              <TableCell className="py-5 whitespace-nowrap">
                <Badge
                  className={cn(
                    "px-2 py-1 rounded-md flex items-center justify-center text-xs shrink-0",
                    order.type === "birthday"
                      ? "bg-[#FFEDD4] text-[#CA3500]"
                      : order.type === "holiday"
                        ? "bg-[#DCFCE7] text-[#008236]"
                        : "bg-purple-50 text-purple-500",
                  )}
                >
                  {order.type}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
