
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import SharedDropdown from "@/components/shared/SharedDropdown";

const exportSchema = z.object({
    format: z.string().min(1, "Please select a format"),
    range: z.enum(["all", "visible"]),
});

type ExportFormData = z.infer<typeof exportSchema>;

interface ExportOrdersModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const formatOptions = [
    { label: "CSV", value: "csv" },
    { label: "Excel", value: "excel" },
    { label: "Pdf", value: "pdf" },
];

export default function ExportOrdersModal({ isOpen, onClose }: ExportOrdersModalProps) {
    const { handleSubmit, control } = useForm<ExportFormData>({
        resolver: zodResolver(exportSchema),
        defaultValues: {
            range: "visible",
        },
    });

    const onSubmit = (data: ExportFormData) => {
        console.log("Export Data:", data);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="xl:min-w-[600px] w-full p-8 rounded-2xl border-none shadow-lg bg-white">

                <DialogHeader className="mb-8">
                    <DialogTitle className="text-[24px] font-normal text-[#1A1C21]">
                        Export Orders
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <div className="space-y-3">
                        <Controller
                            name="format"
                            control={control}
                            render={({ field }) => (
                                <SharedDropdown
                                    options={formatOptions}
                                    selectedValue={field.value}
                                    onValueChange={field.onChange}
                                    placeholder="Select format"
                                    className="w-full h-14 bg-white border border-gray-100 rounded-xl px-4"
                                />
                            )}
                        />
                    </div>

                    <div className="space-y-4">
                        <Label className="text-[18px] font-normal text-[#1A1C21]">Select range</Label>
                        <Controller
                            name="range"
                            control={control}
                            render={({ field }) => (
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="space-y-4"
                                >
                                    <div className="flex items-center space-x-3">
                                        <RadioGroupItem value="all" id="all" className="border-gray-300 text-[#CA8A32]" />
                                        <Label htmlFor="all" className="text-[16px] font-normal text-[#1A1C21] cursor-pointer">All Orders</Label>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <RadioGroupItem value="visible" id="visible" className="border-gray-300 text-[#CA8A32]" />
                                        <Label htmlFor="visible" className="text-[16px] font-normal text-[#1A1C21] cursor-pointer">Visible Orders only</Label>
                                    </div>
                                </RadioGroup>
                            )}
                        />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4">
                        <Button
                            variant={"accent"}
                            type="button"
                            onClick={onClose}

                        >
                            Cancel
                        </Button>
                        <Button
                            variant={"secondary"}
                            type="submit"

                        >
                            Export
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}