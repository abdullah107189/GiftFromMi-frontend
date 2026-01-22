
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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
import { DialogDescription } from "@radix-ui/react-dialog";

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
    const { handleSubmit, control, formState: { errors } } = useForm<ExportFormData>({
        resolver: zodResolver(exportSchema),
        defaultValues: {
            range: "visible", format: ""
        },
    });

    const onSubmit = (data: ExportFormData) => {
        console.log("Export Data:", data);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="xl:min-w-[600px] w-full p-0 rounded-2xl border-none shadow-lg bg-white">

                <DialogHeader className="md:mb-6 mb-4 border-b border-gray-200">
                    <DialogTitle className="xl:p-6 p-4 font-normal text-gray-900 flex items-center justify-between">
                        <p>Export Orders</p>
                        <button onClick={onClose} className="cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M15 5L5 15" stroke="#99A1AF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M5 5L15 15" stroke="#99A1AF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </DialogTitle>

                    <DialogDescription className="sr-only">
                        Choose export format and order range before exporting orders.
                    </DialogDescription>
                </DialogHeader>


                <form onSubmit={handleSubmit(onSubmit)} id="exportForm" className=" xl:pl-6 xl:pr-6  pl-4 pr-4">
                    <div className="mb-4 md:mb-6">
                        <Controller
                            name="format"
                            control={control}

                            render={({ field }) => (
                                <SharedDropdown
                                    options={formatOptions}
                                    selectedValue={field.value}
                                    onValueChange={field.onChange}
                                    placeholder="Select format"
                                    className={` ${errors.format ? 'border-red-500' : ''} w-full h-10 bg-gray-50 border border-gray-100 rounded-xl text-sm px-4`}

                                />
                            )}
                        />
                        {errors.format && (
                            <p className="text-xs text-red-500 mt-2 ml-4">
                                {errors.format.message}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <Label className="mb-2.5 text-[14px] font-normal text-gray-700">Select range</Label>
                        <Controller
                            name="range"
                            control={control}
                            render={({ field }) => (
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className=""
                                >
                                    <div className="flex items-center space-x-3">
                                        <RadioGroupItem value="all" id="all" className="active:border-primary focus:border-primary text-primary" />
                                        <Label htmlFor="all" className="text-sm font-normal text-[#1A1C21] cursor-pointer">All Orders</Label>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <RadioGroupItem value="visible" id="visible" className="active:border-primary focus:border-primary text-primary" />
                                        <Label htmlFor="visible" className="text-sm font-normal text-[#1A1C21] cursor-pointer">Visible Orders only</Label>
                                    </div>
                                </RadioGroup>
                            )}
                        />
                    </div>

                </form>
                <div className="flex items-center justify-end gap-3 border-t xl:p-[24px] p-4">
                    <Button
                        variant={"accent"}
                        type="button"
                        onClick={onClose}

                    >
                        Cancel
                    </Button>
                    <Button
                        form="exportForm"
                        variant={"secondary"}
                        type="submit"

                    >
                        Export
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}