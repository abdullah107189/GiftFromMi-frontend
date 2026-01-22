import { cn } from "@/lib/utils";
import type { QuickAction } from "@/types/dashboard";
import NewOrderModal from "../NewOrderModal";
import { useState } from "react";
import ImportRecipientsModal from "../Recipients/ImportRecipientsModal";
import AddRecipientModal from "../Recipients/AddRecipientModal";
import CreateCampaignModal from "../Campaigns/CreateCampaignModal";
interface QuickActionCardProps {
  action: QuickAction;
}

export default function QuickActionCard({ action }: QuickActionCardProps) {
  const isHighlight = action.variant === "highlight";

  const [isOpen, setIsOpen] = useState(false);
  console.log(isOpen);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [isAddRecipientOpen, setIsAddRecipientOpen] = useState(false);
  const [isCampaignOpen, setIsCampaignOpen] = useState(false);

  const handleOpenModal = (action: string) => {
    console.log(action);
    if (action === "Create Order") {
      setIsOpen(true);
    } else if (action === "Bulk Upload") {
      setIsImportOpen(true);
    } else if (action === "Add Recipients") {
      setIsAddRecipientOpen(true);
    } else if (action === "New Campaign") {
      setIsCampaignOpen(true);
    }
  };

  return (
    <div className="">
      <div
        onClick={() => handleOpenModal(action.title)}
        className={cn(
          "flex flex-col gap-4 p-6 rounded-xl cursor-pointer transition-all duration-200 border ",
          isHighlight
            ? "bg-[linear-gradient(96deg,#D0A15A_5.18%,#C57200_96.62%)] text-white "
            : "bg-gray-50 border-gray-200 hover:bg-gray-100",
        )}
      >
        <action.icon
          className={cn(
            "size-6",
            isHighlight ? "text-white" : "text-[#1B1D1E]",
          )}
        />

        <div>
          <h4
            className={cn(
              "text-sm font-semibold",
              isHighlight ? "text-white" : "text-gray-900 ",
            )}
          >
            {action.title}
          </h4>
          <p
            className={cn(
              "text-sm mt-1",
              isHighlight ? "text-white" : "text-gray-500",
            )}
          >
            {action.description}
          </p>
        </div>
      </div>
      <div className="">
        <NewOrderModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        <ImportRecipientsModal
          isOpen={isImportOpen}
          onClose={() => setIsImportOpen(false)}
        />
        <AddRecipientModal
          isOpen={isAddRecipientOpen}
          onClose={() => setIsAddRecipientOpen(false)}
        />
        <CreateCampaignModal
          isOpen={isCampaignOpen}
          onClose={() => setIsCampaignOpen(false)}
        ></CreateCampaignModal>
      </div>
    </div>
  );
}
