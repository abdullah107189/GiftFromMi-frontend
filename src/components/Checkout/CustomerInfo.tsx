import { CalendarIcon, ChevronDown, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useMemo } from "react";
import { countries } from "@/utils/countryCode";
import { SharedSearchableSelect } from "../shared/SharedSearchableSelect";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import type { CheckoutCustomerFormData } from "@/zodValidation/checkout.schema";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

type CustomerInfoProps = {
  handleCalculateShippingForSingle?: (
    countryCode: string,
    type: CheckoutCustomerFormData["type"],
  ) => Promise<void> | void;
};

export function CustomerInfo({
  handleCalculateShippingForSingle,
}: CustomerInfoProps) {
  const inputStyle =
    "bg-[#F0F1F1] border placeholder:text-gray-500 text-base border-[#EBECF0] rounded-2xl md:p-6 p-4 focus-visible:ring-1 focus-visible:ring-primary md:h-[72px] h-[60px]";
  const today = new Date(new Date().setHours(0, 0, 0, 0));

  const {
    control,
    register,
    setValue,
    formState: { errors },
  } = useFormContext<CheckoutCustomerFormData>();

  const countryCodeOptions = useMemo(
    () =>
      countries.map((country) => ({
        label: `${country.label} (${country.value.toUpperCase()})`,
        value: country.value.toUpperCase(),
      })),
    [],
  );

  const countryNameByCode = useMemo(
    () =>
      Object.fromEntries(
        countries.map((country) => [
          country.value.toUpperCase(),
          country.label,
        ]),
      ) as Record<string, string>,
    [],
  );

  // Watch only what you need (avoid watching entire form)
  const shippingCode = useWatch({ control, name: "shippingCountryCode" });

  // Auto set shippingCountry name when shipping code changes
  useEffect(() => {
    if (!shippingCode) return;
    setValue("shippingCountry", countryNameByCode[shippingCode] ?? "", {
      shouldDirty: true,
      shouldTouch: true,
    });
  }, [shippingCode, countryNameByCode, setValue]);

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3 md:mb-6 mb-4">
        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center p-2 ">
          <User strokeWidth={1.5} className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-medium mb-1.5 text-gray-900">
            Customer Information
          </h2>
          <p className="text-gray-900">Please provide your contact details</p>
        </div>
      </div>

      <div className="flex gap-5 flex-col">
        {/* Name */}
        <div className="space-y-2">
          <Label className="text-[18px] font-medium text-gray-900">
            Name<span className="text-red-500">*</span>
          </Label>
          <Input
            {...register("name")}
            required
            placeholder="Enter your name..."
            className={inputStyle}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Email + Phone */}
        <div className="grid grid-cols-1 gap-5">
          <div className="space-y-2">
            <Label className="text-[18px] font-medium text-gray-900">
              Email Address<span className="text-red-500">*</span>
            </Label>
            <Input
              {...register("email")}
              required
              placeholder="Enter your email..."
              className={inputStyle}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-[18px] font-medium text-gray-900">
              Phone Number<span className="text-red-500">*</span>
            </Label>
            <Input
              {...register("phone")}
              required
              placeholder="Enter your Number"
              className={inputStyle}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>
        </div>

        {/* Street Address */}
        <div className="space-y-2">
          <Label className="text-[18px] font-medium text-gray-900">
            Street Address<span className="text-red-500">*</span>
          </Label>
          <Input
            {...register("street_address")}
            required
            placeholder="House Flat/No., Street Name"
            className={inputStyle}
          />
          {errors.street_address && (
            <p className="text-red-500 text-sm">
              {errors.street_address.message}
            </p>
          )}
        </div>

        {/* Country */}
        <div className="space-y-2 ">
          <Label className="text-[18px] font-medium text-gray-900">
            Country / Region
          </Label>
          <Controller
            control={control}
            name="country"
            render={({ field }) => (
              <SharedSearchableSelect
                required
                options={countries}
                value={field.value}
                onChange={field.onChange}
                className="py-4"
                placeholder="Select Country / Region"
              />
            )}
          />
          {errors.country && (
            <p className="text-red-500 text-sm">{errors.country.message}</p>
          )}
        </div>

        {/* Town/City */}
        <div className="space-y-2">
          <Label className="text-[18px] font-medium text-gray-900">
            Town / City<span className="text-red-500">*</span>
          </Label>
          <Input
            {...register("town_city")}
            required
            placeholder="California"
            className={inputStyle}
          />
          {errors.town_city && (
            <p className="text-red-500 text-sm">{errors.town_city.message}</p>
          )}
        </div>

        {/* District */}
        <div className="space-y-2 ">
          <Label className="text-[18px] font-medium text-gray-900">
            District<span className="text-red-500">*</span>
          </Label>
          <Input
            {...register("district")}
            required
            placeholder="Select District"
            className="bg-[#F0F1F1] w-full md:h-18 h-15 border border-[#EBECF0] text-base rounded-2xl md:p-6 p-4 focus-visible:ring-1 focus-visible:ring-primary"
          />
          {errors.district && (
            <p className="text-red-500 text-sm">{errors.district.message}</p>
          )}
        </div>

        {/* Postcode */}
        <div className="space-y-2">
          <Label className="text-[18px] font-medium text-gray-900">
            Postcode / ZIP (optional)
          </Label>
          <Input
            {...register("postcode")}
            required
            placeholder="1258"
            className={inputStyle}
          />
          {errors.postcode && (
            <p className="text-red-500 text-sm">{errors.postcode.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label className="text-[18px] font-medium text-gray-900">
            Scheduled Date<span className="text-red-500">*</span>
          </Label>
          <Controller
            control={control}
            name="scheduled_at"
            render={({ field }) => {
              const selectedDate = field.value
                ? new Date(`${field.value}T00:00:00`)
                : undefined;

              return (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className={cn(
                        "w-full justify-start rounded-2xl border-[#EBECF0] bg-[#F0F1F1] px-4 text-left text-base font-normal text-gray-900 shadow-none md:h-18 h-15 hover:bg-[#F0F1F1]",
                        !selectedDate && "text-gray-500",
                      )}
                    >
                      <CalendarIcon className="mr-3 h-5 w-5 text-gray-400" />
                      {selectedDate ? (
                        format(selectedDate, "PPP")
                      ) : (
                        <span>Select delivery date</span>
                      )}
                      <ChevronDown className="ml-auto h-4 w-4 text-gray-400" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto rounded-2xl border border-[#EBECF0] p-0 shadow-xl"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) =>
                        field.onChange(date ? format(date, "yyyy-MM-dd") : "")
                      }
                      disabled={(date) => date < today}
                      className="rounded-2xl"
                    />
                  </PopoverContent>
                </Popover>
              );
            }}
          />
          {errors.scheduled_at && (
            <p className="text-red-500 text-sm">
              {errors.scheduled_at.message}
            </p>
          )}
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <Label className="text-[18px] font-medium text-gray-900">
            Order notes (optional)
          </Label>
          <Textarea
            {...register("order_notes")}
            placeholder="Notes About Your Order, e.g. Special Notes for Delivery"
            className="min-h-30 max-h-75 bg-[#F1F3F4] border-none rounded-xl p-4 focus-visible:ring-1 focus-visible:ring-[#CA8A32] resize-none"
          />
          {errors.order_notes && (
            <p className="text-red-500 text-sm">{errors.order_notes.message}</p>
          )}
        </div>

        {/* Shipping Country Code */}
        <div className="space-y-2 ">
          <Label className="text-[18px] font-medium text-gray-900">
            Shipping Country Code<span className="text-red-500">*</span>
          </Label>
          <Controller
            control={control}
            name="shippingCountryCode"
            render={({ field }) => (
              <SharedSearchableSelect
                required
                options={countryCodeOptions}
                value={field.value}
                onChange={(value) => {
                  field.onChange(value);
                  if (value) {
                    void handleCalculateShippingForSingle?.(value, "single");
                  }
                }}
                className="py-4"
                placeholder="Select Shipping Country Code"
              />
            )}
          />
          {errors.shippingCountryCode && (
            <p className="text-red-500 text-sm">
              {errors.shippingCountryCode.message}
            </p>
          )}
        </div>

        {/* Shipping Country */}
        <div className="space-y-2">
          <Label className="text-[18px] font-medium text-gray-900">
            Shipping Country<span className="text-red-500">*</span>
          </Label>
          <Input
            {...register("shippingCountry")}
            required
            disabled
            placeholder="United States"
            className={inputStyle}
          />
          {errors.shippingCountry && (
            <p className="text-red-500 text-sm">
              {errors.shippingCountry.message}
            </p>
          )}
        </div>

        {/* Shipping Province */}
        <div className="space-y-2">
          <Label className="text-[18px] font-medium text-gray-900">
            Shipping Province<span className="text-red-500">*</span>
          </Label>
          <Input
            {...register("shippingProvince")}
            required
            placeholder="Dhaka"
            className={inputStyle}
          />
          {errors.shippingProvince && (
            <p className="text-red-500 text-sm">
              {errors.shippingProvince.message}
            </p>
          )}
        </div>

        {/* Shipping City */}
        <div className="space-y-2">
          <Label className="text-[18px] font-medium text-gray-900">
            Shipping City<span className="text-red-500">*</span>
          </Label>
          <Input
            {...register("shippingCity")}
            required
            placeholder="Dhaka"
            className={inputStyle}
          />
          {errors.shippingCity && (
            <p className="text-red-500 text-sm">
              {errors.shippingCity.message}
            </p>
          )}
        </div>

        {/* Shipping Address */}
        <div className="space-y-2">
          <Label className="text-[18px] font-medium text-gray-900">
            Shipping Address<span className="text-red-500">*</span>
          </Label>
          <Input
            {...register("shippingAddress")}
            required
            placeholder="Enter shipping address"
            className={inputStyle}
          />
          {errors.shippingAddress && (
            <p className="text-red-500 text-sm">
              {errors.shippingAddress.message}
            </p>
          )}
        </div>

        {/* Logistic Name */}
        {/* <div className="space-y-2">
          <Label className="text-[18px] font-medium text-gray-900">
            Logistic Name<span className="text-red-500">*</span>
          </Label>
          <Input
            {...register("logisticName")}
            required
            placeholder="Enter logistic name"
            className={inputStyle}
          />
          {errors.logisticName && (
            <p className="text-red-500 text-sm">
              {errors.logisticName.message}
            </p>
          )}
        </div> */}

        {/* From Country Code */}
        <div className="space-y-2 ">
          <Label className="text-[18px] font-medium text-gray-900">
            From Country Code<span className="text-red-500">*</span>
          </Label>
          <Controller
            control={control}
            name="fromCountryCode"
            render={({ field }) => (
              <SharedSearchableSelect
                required
                options={countryCodeOptions}
                value={field.value}
                onChange={field.onChange}
                className="py-4"
                placeholder="Select From Country Code"
              />
            )}
          />
          {errors.fromCountryCode && (
            <p className="text-red-500 text-sm">
              {errors.fromCountryCode.message}
            </p>
          )}
        </div>

        {/* Save info checkbox */}
        <div className="flex items-center gap-3 mt-2">
          <Controller
            control={control}
            name="saveInfo"
            render={({ field }) => (
              <Checkbox
                id="save-info"
                checked={Boolean(field.value)}
                onCheckedChange={(v) => field.onChange(Boolean(v))}
                className="w-5 h-5 border-gray-200 data-[state=checked]:bg-[#CA8A32] data-[state=checked]:border-[#CA8A32]"
              />
            )}
          />
          <label htmlFor="save-info" className="text-gray-500 cursor-pointer">
            Save this information for next time
          </label>
        </div>
      </div>
    </section>
  );
}
