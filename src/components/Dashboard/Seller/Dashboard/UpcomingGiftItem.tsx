// components/UpcomingGiftItem.tsx
import type { UpcomingGift } from "@/types/dashboard";
import { Calendar } from "lucide-react";

interface UpcomingGiftItemProps {
  gift: UpcomingGift;
}

export default function UpcomingGiftItem({ gift }: UpcomingGiftItemProps) {
  return (
    <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
      <div>
        <h4 className="font-medium text-gray-900">{gift.recipient}</h4>
        <p className="text-sm text-gray-500">{gift.gift}</p>
      </div>
      <div className="flex items-center text-sm text-gray-500">
        <Calendar className="h-4 w-4 mr-2" />
        <span>{gift.date}</span>
      </div>
    </div>
  );
}
