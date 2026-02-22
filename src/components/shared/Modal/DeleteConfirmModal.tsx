import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface DeleteConfirmModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
}

const DeleteConfirmModal = ({
    isOpen,
    onOpenChange,
    onConfirm,
}: DeleteConfirmModalProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[480px] rounded-4xl p-8 border-none shadow-2xl">
                <DialogHeader className="flex flex-col items-center justify-center space-y-4">
                    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
                        <AlertTriangle size={32} className="text-destructive" />
                    </div>

                    <div className="space-y-2 text-center">
                        <DialogTitle className="text-2xl font-bold text-gray-900 font-manrope">
                            Delete Item?
                        </DialogTitle>

                        <DialogDescription className="text-gray-500 text-base font-inter">
                            This item will be removed from your cart permanently.
                        </DialogDescription>
                    </div>
                </DialogHeader>

                <DialogFooter className="flex flex-col sm:flex-row gap-3 mt-8 sm:justify-center">
                    <Button
                        type="button"
                        variant="accent"
                        onClick={() => onOpenChange(false)}
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
                        Yes, Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteConfirmModal;