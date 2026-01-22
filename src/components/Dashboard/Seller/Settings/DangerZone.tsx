import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router";
export default function DangerZone() {
  const [open, setOpen] = useState(false);
  const handleDeactivate = () => {
    toast.success("Account Deactivated");
  };
  const navigate = useNavigate();
  const handleDelete = () => {
    toast.success("Delete your account!");
    navigate("/login");
    setOpen(false);
  };

  return (
    <div className="w-full space-y-8 bg-white md:p-6 p-4 rounded-2xl border border-gray-300 md:mt-6 mt-4">
      {/* Header Section */}
      <div className="flex items-start gap-4">
        <div className="p-2.5 bg-[#FEF2F2] rounded-[10px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M18.109 14.9999L11.4423 3.33319C11.297 3.0767 11.0862 2.86335 10.8314 2.71492C10.5767 2.56649 10.2872 2.48828 9.99234 2.48828C9.69752 2.48828 9.40797 2.56649 9.15324 2.71492C8.8985 2.86335 8.6877 3.0767 8.54234 3.33319L1.87567 14.9999C1.72874 15.2543 1.6517 15.5431 1.65235 15.837C1.653 16.1308 1.73132 16.4192 1.87938 16.673C2.02744 16.9269 2.23996 17.137 2.49542 17.2822C2.75088 17.4274 3.04018 17.5025 3.33401 17.4999H16.6673C16.9598 17.4996 17.2469 17.4223 17.5001 17.2759C17.7532 17.1295 17.9634 16.9191 18.1094 16.6658C18.2555 16.4125 18.3324 16.1252 18.3323 15.8328C18.3322 15.5404 18.2552 15.2531 18.109 14.9999Z"
              stroke="#DF1C41"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 7.5V10.8333"
              stroke="#DF1C41"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 14.166H10.0083"
              stroke="#DF1C41"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="space-y-1">
          <h3 className="text-[#DF1C41]">Danger Zone</h3>
          <p className="text-sm text-gray-500">
            Irreversible actions that affect your account
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Deactivate Account Box */}
        <div className="flex items-center justify-between p-4 border border-[#FFC9C9] rounded-2xl bg-white">
          <div className="space-y-1">
            <h4 className=" text-gray-900">Deactivate account</h4>
            <p className="text-sm text-gray-500">
              Temporarily disable your account. You can reactivate it anytime.
            </p>
          </div>
          <button
            onClick={handleDeactivate}
            className="px-6 py-2 border border-[#FFC9C9] text-[#DF1C41] text-sm  rounded-lg"
          >
            Deactivate
          </button>
        </div>

        {/* Delete Account Box */}
        <div className="flex items-center justify-between p-4 border border-[#FFC9C9] rounded-2xl bg-white">
          <div className="space-y-1">
            <h4 className=" text-gray-900">Delete account</h4>
            <p className="text-sm text-gray-500">
              Permanently delete your account and all associated data. This
              action cannot be undone.
            </p>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="px-6 py-2 bg-[#DF1C41] text-white text-sm rounded-lg"
          >
            Delete Account
          </button>
        </div>
      </div>
      <AlertDialog open={open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDelete()}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
