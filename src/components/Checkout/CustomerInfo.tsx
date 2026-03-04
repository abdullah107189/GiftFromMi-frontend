import { User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useMemo } from "react";
import { countries } from "@/utils/countryCode";
import { SharedSearchableSelect } from "../shared/SharedSearchableSelect";

export type CheckoutCustomerFormData = {
  name: string;
  email: string;
  phone: string;
  street_address: string;
  country: string;
  town_city: string;
  district: string;
  postcode: string;
  order_notes: string;
  shippingCountryCode: string;
  shippingCountry: string;
  shippingProvince: string;
  shippingCity: string;
  shippingAddress: string;
  logisticName: string;
  fromCountryCode: string;
  type?: string;
};

interface CustomerInfoProps {
  values: CheckoutCustomerFormData;
  onFieldChange: (field: keyof CheckoutCustomerFormData, value: string) => void;
}

export function CustomerInfo({ values, onFieldChange }: CustomerInfoProps) {
  const inputStyle =
    "bg-[#F0F1F1] border placeholder:text-gray-500 text-base border-[#EBECF0] rounded-2xl md:p-6 p-4 focus-visible:ring-1 focus-visible:ring-primary md:h-[72px] h-[60px]";

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
      ),
    [],
  );

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
        <div className="space-y-2">
          <Label className="text-[18px] font-medium text-gray-900">
            Name<span className="text-red-500">*</span>
          </Label>
          <Input
            value={values.name}
            onChange={(e) => onFieldChange("name", e.target.value)}
            placeholder="Enter your name..."
            className={inputStyle}
          />
        </div>

        <div className="grid grid-cols-1 gap-5">
          <div className="space-y-2">
            <Label className="text-[18px] font-medium text-gray-900">
              Email Address<span className="text-red-500">*</span>
            </Label>
            <Input
              value={values.email}
              onChange={(e) => onFieldChange("email", e.target.value)}
              placeholder="Enter your email..."
              className={inputStyle}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[18px] font-medium text-gray-900">
              Phone Number<span className="text-red-500">*</span>
            </Label>
            <Input
              value={values.phone}
              onChange={(e) => onFieldChange("phone", e.target.value)}
              placeholder="Enter your Number"
              className={inputStyle}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-[18px] font-medium text-gray-900">
            Street Address<span className="text-red-500">*</span>
          </Label>
          <Input
            value={values.street_address}
            onChange={(e) => onFieldChange("street_address", e.target.value)}
            placeholder="House Flat/No., Street Name"
            className={inputStyle}
          />
        </div>

        <div className="space-y-2 ">
          <Label className="text-[18px] font-medium text-gray-900">
            Country / Region<span className="text-red-500">*</span>
          </Label>
          <SharedSearchableSelect
            required
            options={countries}
            value={values.country}
            onChange={(value) => onFieldChange("country", value)}
            className="py-4"
            placeholder="Select Country / Region"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-[18px] font-medium text-gray-900">
            Town / City<span className="text-red-500">*</span>
          </Label>
          <Input
            value={values.town_city}
            onChange={(e) => onFieldChange("town_city", e.target.value)}
            placeholder="California"
            className={inputStyle}
          />
        </div>

        <div className="space-y-2 ">
          <Label className="text-[18px] font-medium text-gray-900">
            District<span className="text-red-500">*</span>
          </Label>
          <Input
            onChange={(e) => onFieldChange("district", e.target.value)}
            placeholder="Select District"
            className="bg-[#F0F1F1] w-full md:h-18 h-15 border border-[#EBECF0] text-base rounded-2xl md:p-6 p-4 focus-visible:ring-1 focus-visible:ring-primary"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-[18px] font-medium text-gray-900">
            Postcode / ZIP (optional)
          </Label>
          <Input
            value={values.postcode}
            onChange={(e) => onFieldChange("postcode", e.target.value)}
            placeholder="1258"
            className={inputStyle}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-[18px] font-medium text-gray-900">
            Order notes (optional)
          </Label>
          <Textarea
            value={values.order_notes}
            onChange={(e) => onFieldChange("order_notes", e.target.value)}
            placeholder="Notes About Your  Order, e.g. Specials Notes for Delivery"
            className="min-h-30 max-h-75 bg-[#F1F3F4] border-none rounded-xl p-4 focus-visible:ring-1 focus-visible:ring-[#CA8A32] resize-none"
          />
        </div>

        <div className="space-y-2 ">
          <Label className="text-[18px] font-medium text-gray-900">
            Shipping Country Code
          </Label>
          <SharedSearchableSelect
            options={countryCodeOptions}
            value={values.shippingCountryCode}
            onChange={(value) => {
              onFieldChange("shippingCountryCode", value);
              onFieldChange("shippingCountry", countryNameByCode[value] ?? "");
            }}
            className="py-4"
            placeholder="Select Shipping Country Code"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-[18px] font-medium text-gray-900">
            Shipping Country
          </Label>
          <Input
            value={values.shippingCountry}
            onChange={(e) => onFieldChange("shippingCountry", e.target.value)}
            placeholder="United States"
            className={inputStyle}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-[18px] font-medium text-gray-900">
            Shipping Province
          </Label>
          <Input
            value={values.shippingProvince}
            onChange={(e) => onFieldChange("shippingProvince", e.target.value)}
            placeholder="Dhaka"
            className={inputStyle}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-[18px] font-medium text-gray-900">
            Shipping City
          </Label>
          <Input
            value={values.shippingCity}
            onChange={(e) => onFieldChange("shippingCity", e.target.value)}
            placeholder="Dhaka"
            className={inputStyle}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-[18px] font-medium text-gray-900">
            Shipping Address
          </Label>
          <Input
            value={values.shippingAddress}
            onChange={(e) => onFieldChange("shippingAddress", e.target.value)}
            placeholder="Enter shipping address"
            className={inputStyle}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-[18px] font-medium text-gray-900">
            Logistic Name
          </Label>
          <Input
            value={values.logisticName}
            onChange={(e) => onFieldChange("logisticName", e.target.value)}
            placeholder="Enter logistic name"
            className={inputStyle}
          />
        </div>

        <div className="space-y-2 ">
          <Label className="text-[18px] font-medium text-gray-900">
            From Country Code
          </Label>
          <SharedSearchableSelect
            options={countryCodeOptions}
            value={values.fromCountryCode}
            onChange={(value) => onFieldChange("fromCountryCode", value)}
            className="py-4"
            placeholder="Select From Country Code"
          />
        </div>

        <div className="flex items-center gap-3 mt-2">
          <Checkbox
            id="save-info"
            className="w-5 h-5 border-gray-200 data-[state=checked]:bg-[#CA8A32] data-[state=checked]:border-[#CA8A32]"
          />
          <label htmlFor="save-info" className="text-gray-500  cursor-pointer">
            Save this information for next time
          </label>
        </div>
      </div>
    </section>
  );
}
