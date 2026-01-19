import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Calendar as CalendarIcon, Users, Gift, Zap } from "lucide-react";
import { format } from "date-fns";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import SharedDropdown from "@/components/shared/SharedDropdown";
import { cn } from "@/lib/utils";

export const campaignSchema = z.object({
    name: z.string().min(1, "Campaign name is required"),
    description: z.string().optional(),
    startDate: z.date("Start date is required"),
    status: z.string().min(1, "Status is required"),
    recipients: z.string().min(1, "Recipient group is required"),
    gift: z.string().min(1, "Please select a gift"),
    trigger: z.string().min(1, "Trigger is required"),
});

export type CampaignFormData = z.infer<typeof campaignSchema>;

export const FormLabel = ({ children }: { children: React.ReactNode }) => (
    <label className="block text-[14px] text-gray-500 mb-1.5">
        {children}
    </label>
);

export default function CreateCampaignModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CampaignFormData>({
        resolver: zodResolver(campaignSchema),
        defaultValues: {
            name: "",
            description: "",
            status: "draft",
            recipients: "",
            gift: "",
            trigger: "",
        },
    });

    const onSubmit = (data: CampaignFormData) => {
        console.log("Final Form Data:", data);
        reset();
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="xl:min-w-[750px] max-h-[90vh] overflow-y-auto p-0 rounded-3xl border-none bg-white [&>button]:hidden">
                <DialogHeader className="p-8 pb-4">
                    <DialogTitle className="text-[20px] font-normal text-gray-900">Create Campaign</DialogTitle>
                    <DialogDescription className="text-[14px] text-gray-500">Set up a new automated gift campaign</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="p-8 pt-0 space-y-6">
                    <div>
                        <FormLabel > Campaign Name</FormLabel>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    placeholder="e.g., Holiday 2024"

                                    className={cn("placeholder:text-gray-400 h-12 bg-gray-50 border-gray-100 rounded-xl", errors.name && "border-red-500")}
                                />
                            )}
                        />
                        {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
                    </div>

                    <div>
                        <FormLabel>Description</FormLabel>
                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <Textarea
                                    {...field}
                                    placeholder="Describe the purpose of this campaign"
                                    className="placeholder:text-gray-400 bg-gray-50 border-gray-100 rounded-xl min-h-[100px]"
                                />
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Start Date with Shadcn Calendar */}
                        <div>
                            <FormLabel >Start Date</FormLabel>
                            <Controller
                                name="startDate"
                                control={control}
                                render={({ field }) => (
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <button
                                                type="button"
                                                className={cn(
                                                    "flex h-12 w-full items-center rounded-xl border border-gray-100 bg-gray-50 px-3 py-2 text-sm text-[#5C5C5C] outline-none transition-all",
                                                    !field.value && "text-gray-400",
                                                    errors.startDate && "border-red-500"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-5 w-5 text-gray-400" />
                                                {field.value ? format(field.value, "PPP") : <span>dd/mm/yyyy</span>}
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0 rounded-2xl border-gray-100" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                                                className="rounded-2xl"
                                            />
                                        </PopoverContent>
                                    </Popover>
                                )}
                            />
                            {errors.startDate && <p className="text-xs text-red-500 mt-1">{errors.startDate.message}</p>}
                        </div>

                        <div>
                            <FormLabel >Status</FormLabel>
                            <Controller
                                name="status"
                                control={control}
                                render={({ field }) => (
                                    <SharedDropdown
                                        options={[
                                            { label: "Active", value: "active" },
                                            { label: "Draft", value: "draft" },
                                            { label: "Paused", value: "paused" },
                                        ]}
                                        selectedValue={field.value}
                                        onValueChange={field.onChange}
                                        className={cn("h-12 bg-gray-50 border-gray-100 rounded-xl w-full", errors.status && "border-red-500", !field.value && "text-gray-400")}
                                    />
                                )}
                            />
                        </div>
                    </div>

                    <div>
                        <FormLabel >Recipients</FormLabel>
                        <Controller
                            name="recipients"
                            control={control}
                            render={({ field }) => (
                                <SharedDropdown
                                    triggerIcon={<Users className="h-5 w-5" />}
                                    placeholder="Select recipient group"
                                    options={[
                                        { label: "All recipients", value: "all" },
                                        { label: "VIP clients", value: "vip" },
                                        { label: "Custom Group", value: "custom" },
                                    ]}
                                    selectedValue={field.value}
                                    onValueChange={field.onChange}
                                    className={cn("h-12 bg-gray-50 border-gray-100 rounded-xl w-full", errors.recipients && "border-red-500", !field.value && "text-gray-400")}
                                />
                            )}
                        />
                        {errors.recipients && <p className="text-xs text-red-500 mt-1">{errors.recipients.message}</p>}
                    </div>

                    <div>
                        <FormLabel >Gift</FormLabel>
                        <Controller
                            name="gift"
                            control={control}
                            render={({ field }) => (
                                <SharedDropdown
                                    triggerIcon={<Gift className="h-5 w-5" />}
                                    placeholder="Select gift to send"
                                    options={[
                                        { label: "Holiday Hamper", value: "hamper" },
                                        { label: "Birthday Gift Box", value: "birthday_box" },
                                    ]}
                                    selectedValue={field.value}
                                    onValueChange={field.onChange}
                                    className={cn("h-12 bg-gray-50 border-gray-100 rounded-xl w-full", errors.gift && "border-red-500", !field.value && "text-gray-400")}
                                />
                            )}
                        />
                        {errors.gift && <p className="text-xs text-red-500 mt-1">{errors.gift.message}</p>}
                    </div>

                    <div>
                        <FormLabel >Trigger</FormLabel>
                        <Controller
                            name="trigger"
                            control={control}
                            render={({ field }) => (
                                <SharedDropdown
                                    triggerIcon={<Zap className="h-5 w-5" />}
                                    placeholder="Select campaign trigger"
                                    options={[
                                        { label: "On birthday", value: "birthday" },
                                        { label: "Milestone Achieved", value: "milestone" },
                                    ]}
                                    selectedValue={field.value}
                                    onValueChange={field.onChange}
                                    className={cn("h-12 bg-gray-50 border-gray-100 rounded-xl w-full", errors.trigger && "border-red-500", !field.value && "text-gray-400")}
                                />
                            )}
                        />
                        {errors.trigger && <p className="text-xs text-red-500 mt-1">{errors.trigger.message}</p>}
                    </div>

                    <div className="bg-[#FAF5FF] p-4 rounded-lg">
                        <p className="text-xs text-[#4A5565]">
                            You can edit campaign details and pause/resume campaigns at any time from the Campaigns page.
                        </p>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-100">
                        <Button type="button" onClick={onClose} variant="accent" >
                            Cancel
                        </Button>
                        <Button type="submit" variant="secondary" >
                            Create Campaign
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}