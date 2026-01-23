import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  CalendarIcon,
  Users,
  Gift,
  Megaphone,
  ChevronDown,
} from "lucide-react";
import { format } from "date-fns";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import SharedDropdown from "@/components/shared/SharedDropdown";

const orderSchema = z.object({
  deliveryDate: z.date("Delivery date is required"),
  recipient: z.string().min(1, "Recipient is required"),
  gift: z.string().min(1, "Please select a gift"),
  campaign: z.string().optional(),
});

type OrderFormData = z.infer<typeof orderSchema>;

interface NewOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const recipientOptions = [
  { label: "Sara Jonson", value: "sara_jonson" },
  { label: "Jon Merry", value: "jon_merry" },
  { label: "Pitter kerry", value: "pitter_kerry" },
];

const giftOptions = [
  { label: "Birthday Gift Box", value: "birthday_gift_box" },
  { label: "Holiday Hamper", value: "holiday_hamper" },
  { label: "welcome kit", value: "welcome_kit" },
  { label: "Thank you bundle", value: "thank_you_bundle" },
];

const campaignOptions = [
  { label: "Holiday 2024", value: "holiday_2024" },
  { label: "New Client welcome", value: "new_client_welcome" },
];

export default function NewOrderModal({ isOpen, onClose }: NewOrderModalProps) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
  });

  const onSubmit = (data: OrderFormData) => {
    console.log("Order Submitted Data:", {
      ...data,
      deliveryDate: format(data.deliveryDate, "PPP"),
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="xl:min-w-[660px] w-full xl:p-8 md:p-4 p-3 rounded-2xl border-none shadow-lg bg-white ">
        <DialogHeader className="mb-6 text-left">
          <DialogTitle className="text-[20px] font-normal text-gray-900">
            New Order
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Delivery Date with Shadcn Calendar */}
          <div className="space-y-2">
            <Label className="text-gray-500 font-normal text-sm">
              Delivery Date
            </Label>
            <Controller
              name="deliveryDate"
              control={control}
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      className={cn(
                        "flex items-center w-full  h-10 bg-gray-50 border-none rounded-xl px-4 text-sm transition-all outline-none",
                        !field.value ? "text-gray-400" : "text-gray-900",
                      )}
                    >
                      <CalendarIcon className="w-5 h-5 mr-3 text-gray-400" />
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Select date</span>
                      )}
                      <ChevronDown className="ml-auto h-4 w-4 text-gray-400" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0 rounded-xl shadow-xl border-gray-100"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0))
                      }
                      className="rounded-xl border-none "
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
            {errors.deliveryDate && (
              <p className="text-xs text-red-500">
                {errors.deliveryDate.message}
              </p>
            )}
          </div>

          {/* Recipient - Using your SharedDropdown */}
          <div className="space-y-2">
            <Label className="text-gray-500 font-normal text-sm">
              Recipient
            </Label>
            <Controller
              name="recipient"
              control={control}
              render={({ field }) => (
                <SharedDropdown
                  options={recipientOptions}
                  selectedValue={field.value}
                  onValueChange={field.onChange}
                  placeholder="Select recipient"
                  className="w-full  h-10 bg-gray-50 border-none rounded-xl px-4 text-gray-400"
                  triggerIcon={<Users className="w-5 h-5 text-gray-400" />}
                />
              )}
            />
            {errors.recipient && (
              <p className="text-xs text-red-500">{errors.recipient.message}</p>
            )}
          </div>

          {/* Gift - Using your SharedDropdown */}
          <div className="space-y-2">
            <Label className="text-gray-500 font-normal text-sm">Gift</Label>
            <Controller
              name="gift"
              control={control}
              render={({ field }) => (
                <SharedDropdown
                  options={giftOptions}
                  selectedValue={field.value}
                  onValueChange={field.onChange}
                  placeholder="Select Gift"
                  className="w-full  h-10 bg-gray-50 border-none rounded-xl px-4 text-gray-400"
                  triggerIcon={<Gift className="w-5 h-5 text-gray-400" />}
                />
              )}
            />
            {errors.gift && (
              <p className="text-xs text-red-500">{errors.gift.message}</p>
            )}
          </div>

          {/* Campaign - Using your SharedDropdown */}
          <div className="space-y-2">
            <Label className="text-gray-500 font-normal text-sm">
              Campaign
            </Label>
            <Controller
              name="campaign"
              control={control}
              render={({ field }) => (
                <SharedDropdown
                  options={campaignOptions}
                  selectedValue={field.value}
                  onValueChange={field.onChange}
                  placeholder="Optional"
                  className="w-full  h-10 bg-gray-50 border-none rounded-xl px-4 text-gray-400"
                  triggerIcon={<Megaphone className="w-5 h-5 text-gray-400" />}
                />
              )}
            />
          </div>

          <div className="flex items-center justify-end gap-3 md:mt-8">
            <Button variant={"ModalAccent"} type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant={"ModalActive"} type="submit">
              Create Order
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
