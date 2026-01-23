import { Badge } from "@/components/ui/badge";
import { MoreVertical } from "lucide-react";
import SharedDropdown from "@/components/shared/SharedDropdown"; // path fix
import { cn } from "@/lib/utils";
import { statusStyles, type DropdownOption } from "@/data/mockData";
import type { Campaign } from "@/types";

export default function CampaignHeader({
  campaign,
  actions,
  onAction,
}: {
  campaign: Campaign;
  actions: DropdownOption[];
  onAction: (actionValue: string) => void;
}) {
  const style = statusStyles[campaign.status];

  return (
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <div className="flex items-center gap-3">
          <h3 className=" text-gray-900  ">{campaign.title}</h3>

          <Badge
            variant="outline"
            className={cn(
              "h-5 px-2 text-[11px] rounded-md border",
              style.badge,
            )}
          >
            {campaign.status}
          </Badge>
        </div>

        <p className="text-sm text-gray-700 mt-1">{campaign.description}</p>
      </div>

      {/* ✅ icon click -> dropdown */}
      <SharedDropdown
        variant="icon"
        options={actions}
        selectedValue={undefined}
        onValueChange={onAction}
        triggerIcon={
          <div className="flex items-center gap-1">
            <MoreVertical className="h-4 w-4 text-gray-500" />
          </div>
        }
        className="p-2 hover:bg-gray-100 rounded-full w-9 h-9"
        align="end"
      />
    </div>
  );
}
