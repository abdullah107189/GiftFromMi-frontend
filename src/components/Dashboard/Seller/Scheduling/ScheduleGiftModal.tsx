import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import SharedDropdown from "@/components/shared/SharedDropdown";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const scheduleSchema = z.object({
    recipient: z.string().min(1, "Recipient is required"),
    giftType: z.string().min(1, "Gift type is required"),
    occasion: z.string().min(1, "Occasion is required"),
    deliveryDate: z.date().refine((date) => !isNaN(date.getTime()), "Delivery date is required"),
    deliveryTime: z.string().min(1, "Delivery time is required"),
    isRecurring: z.boolean(),
    repeatPattern: z.string(),
    sendNotification: z.boolean(),
});

type ScheduleFormData = z.infer<typeof scheduleSchema>;

interface ScheduleGiftModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const RECIPIENT_LIST = [
    { label: "Ema Thomson", value: "ema_thomson" },
    { label: "Robart Carry", value: "robart_carry" },
    { label: "John Petem", value: "john_petem" },
    { label: "Rocy Peter", value: "rocy_peter" },
];

export const GIFT_TYPES = [
    { label: "Birthday Giftbox", value: "birthday_giftbox" },
    { label: "Holiday Hamper", value: "holiday_hamper" },
    { label: "Welcome Kit", value: "welcome_kit" },
    { label: "Anniversary Bundle", value: "anniversary_bundle" },
    { label: "Thank You Bundle", value: "thank_you_bundle" },
];

export const OCCASION_TYPES = [
    "Birthday", "Holiday", "Anniversary", "Welcome", "Thank You", "Custom"
];

export const REPEAT_PATTERNS = [
    { label: "Daily", value: "daily" },
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
    { label: "Yearly", value: "yearly" },
];

export default function ScheduleGiftModal({ isOpen, onClose }: ScheduleGiftModalProps) {
    const { control, handleSubmit, watch, setValue, formState: { errors } } = useForm<ScheduleFormData>({
        resolver: zodResolver(scheduleSchema),
        defaultValues: {
            recipient: "",
            giftType: "",
            occasion: "Birthday",
            deliveryTime: "09:00 AM",
            isRecurring: false,
            sendNotification: true,
            repeatPattern: "",
            deliveryDate: new Date(),
        }
    });

    const selectedOccasion = watch("occasion");

    const onSubmit = (data: ScheduleFormData) => {
        console.log("Scheduled Gift Data:", data);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px] max-h-[95vh] overflow-y-auto p-0 rounded-3xl border-none">
                <form onSubmit={handleSubmit(onSubmit as any)}>
                    <div className="p-6 md:p-8 space-y-6">
                        <div>
                            <label className="text-sm  mb-2 block">Select Recipient <span className="text-red-500">*</span></label>
                            <Controller
                                name="recipient"
                                control={control}
                                render={({ field }) => (
                                    <SharedDropdown
                                        options={RECIPIENT_LIST}
                                        selectedValue={field.value}
                                        onValueChange={field.onChange}
                                        placeholder="Choose a recipient"
                                        className={cn("h-12 w-full bg-gray-50 border-gray-100 rounded-xl", errors.recipient && "border-red-500")}
                                    />
                                )}
                            />
                            {errors.recipient && <p className="text-red-500 text-xs mt-1">{errors.recipient.message}</p>}
                        </div>
                        <hr className="md:my-6 my-4 text-[rgba(0,0,0,0.10)]" />
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-gray-900  ">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M7.33333 14.486C7.53603 14.603 7.76595 14.6646 8 14.6646C8.23405 14.6646 8.46397 14.603 8.66667 14.486L13.3333 11.8193C13.5358 11.7024 13.704 11.5343 13.821 11.3318C13.938 11.1294 13.9998 10.8998 14 10.666V5.33262C13.9998 5.0988 13.938 4.86916 13.821 4.66673C13.704 4.46429 13.5358 4.29619 13.3333 4.17928L8.66667 1.51262C8.46397 1.39559 8.23405 1.33398 8 1.33398C7.76595 1.33398 7.53603 1.39559 7.33333 1.51262L2.66667 4.17928C2.46418 4.29619 2.29599 4.46429 2.17897 4.66673C2.06196 4.86916 2.00024 5.0988 2 5.33262V10.666C2.00024 10.8998 2.06196 11.1294 2.17897 11.3318C2.29599 11.5343 2.46418 11.7024 2.66667 11.8193L7.33333 14.486Z" stroke="#101828" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M8 14.6667V8" stroke="#101828" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M2.19336 4.66602L8.00003 7.99935L13.8067 4.66602" stroke="#101828" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M5 2.8457L11 6.27904" stroke="#101828" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <span>Gift Details</span>
                            </div>
                            <div>
                                <label className="text-sm mb-2 block">Gift Type <span className="text-red-500">*</span></label>
                                <Controller
                                    name="giftType"
                                    control={control}
                                    render={({ field }) => (
                                        <SharedDropdown
                                            options={GIFT_TYPES}
                                            selectedValue={field.value}
                                            onValueChange={field.onChange}
                                            placeholder="Select gift type"
                                            className={cn("h-12 w-full bg-gray-50 border-gray-100 rounded-xl", errors.giftType && "border-red-500")}
                                        />
                                    )}
                                />
                                {errors.giftType && <p className="text-red-500 text-xs mt-1">{errors.giftType.message}</p>}
                            </div>
                            <div>
                                <label className="text-sm  mb-3 block">Occasion Type</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {OCCASION_TYPES.map((type) => (
                                        <button
                                            key={type}
                                            type="button"
                                            onClick={() => setValue("occasion", type)}
                                            className={cn(
                                                "py-2 px-4 rounded-xl text-sm border transition-all",
                                                selectedOccasion === type
                                                    ? "bg-[#F3E8D6] border-[#CA8A32] text-[#CA8A32]"
                                                    : "bg-white border-gray-100 text-gray-600 hover:bg-gray-50"
                                            )}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <hr className="md:my-6 my-4 text-[rgba(0,0,0,0.10)]" />
                        <div className="space-y-4 pt-2">
                            <div className="flex items-center gap-2 text-gray-900 ">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M5.33398 1.33398V4.00065" stroke="#101828" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M10.666 1.33398V4.00065" stroke="#101828" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M12.6667 2.66602H3.33333C2.59695 2.66602 2 3.26297 2 3.99935V13.3327C2 14.0691 2.59695 14.666 3.33333 14.666H12.6667C13.403 14.666 14 14.0691 14 13.3327V3.99935C14 3.26297 13.403 2.66602 12.6667 2.66602Z" stroke="#101828" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M2 6.66602H14" stroke="#101828" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <span>Schedule Date & Time</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm block">Delivery Date <span className="text-red-500">*</span></label>
                                    <Controller
                                        name="deliveryDate"
                                        control={control}
                                        render={({ field }) => (
                                            <Popover>
                                                <PopoverTrigger asChild >
                                                    <button className={cn("w-full h-12 text-sm flex items-center cursor-pointer", !field.value && "text-muted-foreground", errors.deliveryDate && "border-red-500")}>
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {field.value ? format(field.value, "PPP") : "Select date"}
                                                    </button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0 rounded-2xl">
                                                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} />
                                                </PopoverContent>
                                            </Popover>
                                        )}
                                    />
                                    {errors.deliveryDate && <p className="text-red-500 text-xs mt-1">{errors.deliveryDate.message}</p>}
                                </div>
                                <div>
                                    <label className="text-sm block">Delivery Time</label>
                                    <div className="relative">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none">
                                            <path d="M8 4V8L10.6667 9.33333" stroke="#101828" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M8.00065 14.6673C11.6825 14.6673 14.6673 11.6825 14.6673 8.00065C14.6673 4.31875 11.6825 1.33398 8.00065 1.33398C4.31875 1.33398 1.33398 4.31875 1.33398 8.00065C1.33398 11.6825 4.31875 14.6673 8.00065 14.6673Z" stroke="#101828" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        <Input
                                            type="time"
                                            {...control.register("deliveryTime")}
                                            className="w-full h-12 pl-10 pr-4 border-none shadow-none text-sm focus:outline-none appearance-none [&::-webkit-calendar-picker-indicator]:hidden"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 border border-gray-200 rounded-[10px] space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">

                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M14.166 1.66602L17.4993 4.99935L14.166 8.33268" stroke="#6A7282" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M2.5 9.16667V8.33333C2.5 7.44928 2.85119 6.60143 3.47631 5.97631C4.10143 5.35119 4.94928 5 5.83333 5H17.5" stroke="#6A7282" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M5.83333 18.3327L2.5 14.9993L5.83333 11.666" stroke="#6A7282" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M17.5 10.834V11.6673C17.5 12.5514 17.1488 13.3992 16.5237 14.0243C15.8986 14.6495 15.0507 15.0007 14.1667 15.0007H2.5" stroke="#6A7282" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>

                                    <div>
                                        <p className="text-base ">Recurring Gift</p>
                                        <p className="text-sm text-gray-500">Automatically schedule this gift to repeat</p>
                                    </div>
                                </div>
                                <Controller
                                    name="isRecurring"
                                    control={control}
                                    render={({ field }) => (
                                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="pt-2 ">
                            <label className="text-sm  mb-2 block">Repeat Pattern</label>
                            <Controller
                                name="repeatPattern"
                                control={control}
                                render={({ field }) => (
                                    <SharedDropdown
                                        options={REPEAT_PATTERNS}
                                        selectedValue={field.value}
                                        onValueChange={field.onChange}
                                        placeholder="Select repeat pattern"
                                        className="h-12 bg-gray-50 text-gray-900 border-gray-100 rounded-xl w-full"
                                    />
                                )}
                            />
                        </div>
                        <hr className="md:my-6 my-4 text-[rgba(0,0,0,0.10)]" />
                        {/* Notification */}
                        <div className="flex items-center gap-2 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M6.8457 14C6.96273 14.2027 7.13105 14.371 7.33373 14.488C7.53642 14.605 7.76633 14.6666 8.00037 14.6666C8.23441 14.6666 8.46432 14.605 8.66701 14.488C8.86969 14.371 9.03801 14.2027 9.15504 14" stroke="#101828" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M2.17418 10.218C2.08709 10.3134 2.02962 10.4321 2.00875 10.5597C1.98788 10.6872 2.00453 10.818 2.05665 10.9363C2.10878 11.0545 2.19414 11.155 2.30235 11.2256C2.41056 11.2962 2.53697 11.3339 2.66618 11.334H13.3328C13.462 11.334 13.5885 11.2965 13.6968 11.2261C13.805 11.1556 13.8905 11.0552 13.9428 10.937C13.995 10.8188 14.0118 10.688 13.9911 10.5605C13.9704 10.433 13.9131 10.3142 13.8262 10.2187C12.9395 9.30465 11.9995 8.33332 11.9995 5.33398C11.9995 4.27312 11.5781 3.2557 10.8279 2.50556C10.0778 1.75541 9.06038 1.33398 7.99951 1.33398C6.93865 1.33398 5.92123 1.75541 5.17109 2.50556C4.42094 3.2557 3.99951 4.27312 3.99951 5.33398C3.99951 8.33332 3.05885 9.30465 2.17418 10.218Z" stroke="#101828" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <p className="text-sm font-medium">Notifications & Message</p>
                        </div>
                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-[10px]">
                            <div className="flex items-center gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M8.55664 17.5C8.70293 17.7533 8.91332 17.9637 9.16668 18.11C9.42003 18.2563 9.70743 18.3333 9.99997 18.3333C10.2925 18.3333 10.5799 18.2563 10.8333 18.11C11.0866 17.9637 11.297 17.7533 11.4433 17.5" stroke="#6A7282" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M2.71772 12.771C2.60886 12.8903 2.53702 13.0387 2.51094 13.1981C2.48486 13.3575 2.50566 13.5211 2.57081 13.6688C2.63597 13.8166 2.74267 13.9423 2.87794 14.0306C3.0132 14.1188 3.17121 14.1659 3.33272 14.166H16.6661C16.8276 14.1661 16.9856 14.1192 17.1209 14.0311C17.2563 13.943 17.3631 13.8175 17.4285 13.6698C17.4938 13.5221 17.5148 13.3586 17.4889 13.1992C17.4631 13.0398 17.3914 12.8913 17.2827 12.7718C16.1744 11.6293 14.9994 10.4152 14.9994 6.66602C14.9994 5.33993 14.4726 4.06816 13.5349 3.13048C12.5972 2.1928 11.3255 1.66602 9.99939 1.66602C8.67331 1.66602 7.40154 2.1928 6.46386 3.13048C5.52618 4.06816 4.99939 5.33993 4.99939 6.66602C4.99939 10.4152 3.82356 11.6293 2.71772 12.771Z" stroke="#6A7282" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <div>
                                    <p className="text-sm ">Send Notification</p>
                                    <p className="text-xs text-gray-500">Notify recipient when gift is scheduled</p>
                                </div>
                            </div>
                            <Controller
                                name="sendNotification"
                                control={control}
                                render={({ field }) => (
                                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                                )}
                            />
                        </div>
                        {/* Scheduling Info */}
                        <div className="bg-[#EFF6FF] border border-[#BEDBFF] md:p-4 p-2 rounded-[10px] flex gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <g clip-path="url(#clip0_1126_31387)">
                                    <path d="M9.99935 18.3327C14.6017 18.3327 18.3327 14.6017 18.3327 9.99935C18.3327 5.39698 14.6017 1.66602 9.99935 1.66602C5.39698 1.66602 1.66602 5.39698 1.66602 9.99935C1.66602 14.6017 5.39698 18.3327 9.99935 18.3327Z" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M10 13.3333V10" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M10 6.66602H10.0083" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_1126_31387">
                                        <rect width="20" height="20" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            <div className="text-xs text-[#1C398E] leading-relaxed">
                                <p className=" mb-1">Scheduling Info:</p>
                                The gift will be automatically processed and sent at the scheduled date and time. You'll receive a confirmation email once the gift is dispatched.
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 md:p-6">
                        <Button type="button" onClick={onClose} variant="accent">
                            Cancel
                        </Button>
                        <Button type="submit" variant={"secondary"}>
                            Schedule Gift
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog >
    );
}