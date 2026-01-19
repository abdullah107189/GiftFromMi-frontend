import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Upload, FileText } from "lucide-react";
import Dropzone from "react-dropzone";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
export const importSchema = z.object({
    file: z.instanceof(File, { message: "Please upload a CSV file" })
        .refine((file) => file.type === "text/csv" || file.name.endsWith('.csv'), "Only CSV files are allowed"),
});
export default function ImportRecipientsModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const { handleSubmit, control, setValue, watch, formState: { errors }, reset } = useForm({
        resolver: zodResolver(importSchema),
    });

    const uploadedFile = watch("file");

    const onSubmit = (data: any) => {
        console.log("Uploaded File:", data.file);
        onClose();
        reset();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="xl:min-w-[700px] w-full p-0 rounded-3xl border-none bg-white overflow-hidden">
                <DialogHeader className="xl:p-6 p-4">
                    <DialogTitle className="text-[20px] font-normal text-gray-900">Import Recipients</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="p-6 pt-0 space-y-6 ">
                    <Controller
                        name="file"
                        control={control}
                        render={({ field }) => (
                            <Dropzone
                                onDrop={(acceptedFiles) => {
                                    const file = acceptedFiles[0];
                                    if (file) {
                                        setValue("file", file, { shouldValidate: true });
                                    }
                                }}
                                accept={{ "text/csv": [".csv"] }}
                                maxFiles={1}
                                multiple={false}
                            >
                                {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
                                    <div
                                        {...getRootProps()}
                                        className={cn(
                                            "border-2 border-dashed rounded-2xl p-[50px] flex flex-col items-center justify-center cursor-pointer transition-all",
                                            "border-gray-200 bg-white",
                                            isDragActive && "border-primary bg-primary-50",
                                            isDragReject && "border-red-500 bg-red-50",
                                            errors.file && "border-red-500"
                                        )}
                                    >
                                        <input {...getInputProps()} />

                                        <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                                                <path d="M14 3.5V17.5" stroke="#CA8A32" stroke-width="2.33333" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M19.8337 9.33333L14.0003 3.5L8.16699 9.33333" stroke="#CA8A32" stroke-width="2.33333" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M24.5 17.5V22.1667C24.5 22.7855 24.2542 23.379 23.8166 23.8166C23.379 24.2542 22.7855 24.5 22.1667 24.5H5.83333C5.21449 24.5 4.621 24.2542 4.18342 23.8166C3.74583 23.379 3.5 22.7855 3.5 22.1667V17.5" stroke="#CA8A32" stroke-width="2.33333" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </div>

                                        <div className="text-center">
                                            {uploadedFile ? (
                                                <div className="flex items-center gap-2 text-primary font-medium">
                                                    <FileText className="w-5 h-5" />
                                                    <span>{uploadedFile.name}</span>
                                                </div>
                                            ) : (
                                                <>
                                                    <p className="text-gray-500 text-sm">
                                                        Drag and drop your CSV file here
                                                    </p>
                                                    <p className="text-gray-400 text-xs mt-2">or click to browse</p>
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        className="mt-4 text-sm text-gray-500 border-gray-200 rounded-xl px-4 py-2"
                                                    >
                                                        Choose File
                                                    </Button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </Dropzone>
                        )}
                    />
                    {errors.file && <p className="text-sm text-red-500 mt-1">{errors.file.message as string}</p>}

                    {/* CSV Requirements Section */}
                    <div className="bg-[#F9FAFB] rounded-2xl p-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-3">CSV Format Requirements:</h4>
                        <ul className="space-y-2 text-xs text-gray-500 list-disc list-inside">
                            <li>File must include headers: First Name, Last Name, Email, Phone, Company</li>
                            <li>Email addresses must be valid</li>
                            <li>Phone numbers should include country code</li>
                            <li>Maximum file size: 5MB</li>
                        </ul>
                        <button type="button" className="mt-2.5 text-primary text-sm cursor-pointer hover:underline">
                            Download sample CSV template
                        </button>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
                        <Button
                            type="button"
                            onClick={onClose}
                            variant="accent"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="secondary"
                            
                        >
                            Import Recipients
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}