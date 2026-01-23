import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface LogoutModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

const LogoutModal = ({ isOpen, onOpenChange, onConfirm }: LogoutModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] rounded-4xl p-8 border-none shadow-2xl">
        <DialogHeader className="flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
            <AlertCircle size={32} className="text-destructive" />
          </div>
          <div className="space-y-2 text-center">
            <DialogTitle className="text-2xl font-bold text-gray-900 font-manrope">
              Are you sure?
            </DialogTitle>
            <DialogDescription className="text-gray-500 text-base font-inter">
              You will be logged out of your account. You'll need to log in
              again to access your data.
            </DialogDescription>
          </div>
        </DialogHeader>

        <DialogFooter className="flex flex-col sm:flex-row gap-3 mt-8 sm:justify-center">
          <Button
            onClick={() => onOpenChange(false)}
            type="button"
            variant="accent"
            className="flex-1 h-12 rounded-xl font-bold border-gray-200 text-gray-700 hover:bg-gray-50 transition-all cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
            className="flex-1 h-12 rounded-xl font-bold bg-destructive text-white hover:bg-red-600 transition-all cursor-pointer"
          >
            Yes, Log out
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutModal;
