import { AlertCircle } from "lucide-react";
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
        <div className="p-2 bg-red-50 rounded-lg">
          <AlertCircle className="w-5 h-5 text-[#DF1C41]" />
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-[#DF1C41]">
            Danger Zone
          </h3>
          <p className="text-sm text-gray-500">
            Irreversible actions that affect your account
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Deactivate Account Box */}
        <div className="flex items-center justify-between p-6 border border-red-100 rounded-2xl bg-white">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-gray-900">
              Deactivate account
            </h4>
            <p className="text-sm text-gray-500">
              Temporarily disable your account. You can reactivate it anytime.
            </p>
          </div>
          <button
            onClick={handleDeactivate}
            className="px-6 py-2.5 border border-[#DF1C41] text-[#DF1C41] text-sm font-semibold rounded-xl hover:bg-red-50 transition-all"
          >
            Deactivate
          </button>
        </div>

        {/* Delete Account Box */}
        <div className="flex items-center justify-between p-6 border border-red-100 rounded-2xl bg-white">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-gray-900">
              Delete account
            </h4>
            <p className="text-sm text-gray-500">
              Permanently delete your account and all associated data. This
              action cannot be undone.
            </p>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="px-6 py-2.5 bg-[#DF1C41] text-white text-sm font-semibold rounded-xl hover:bg-[#b91534] transition-all shadow-sm"
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
