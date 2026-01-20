import { User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import SharedDropdown from "@/components/shared/SharedDropdown";

export function CustomerInfo() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const inputStyle =
    "bg-[#F0F1F1] border placeholder:text-gray-500 text-base border-[#EBECF0] rounded-2xl md:p-6 p-4 focus-visible:ring-1 focus-visible:ring-primary md:h-[72px] h-[60px]";

  const countryOptions = [
    { label: "United States", value: "us" },
    { label: "United Kingdom", value: "uk" },
    { label: "Canada", value: "ca" },
    { label: "Australia", value: "au" },
    { label: "Germany", value: "de" },
    { label: "France", value: "fr" },
    { label: "Japan", value: "jp" },
    { label: "China", value: "cn" },
    { label: "India", value: "in" },
    { label: "Bangladesh", value: "bd" },
  ];
  const districtOptions = [
    { label: "Dhaka", value: "dhaka" },
    { label: "Chittagong", value: "chittagong" },
    { label: "Sylhet", value: "sylhet" },
    { label: "Rajshahi", value: "rajshahi" },
    { label: "Khulna", value: "khulna" },
    { label: "Barisal", value: "barisal" },
    { label: "Rangpur", value: "rangpur" },
    { label: "Mymensingh", value: "mymensingh" },
  ];
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
          <Input placeholder="Enter your name..." className={inputStyle} />
        </div>

        <div className="grid grid-cols-1 gap-5">
          <div className="space-y-2">
            <Label className="text-[18px] font-medium text-gray-900">
              Email Address<span className="text-red-500">*</span>
            </Label>
            <Input placeholder="Enter your email..." className={inputStyle} />
          </div>
          <div className="space-y-2">
            <Label className="text-[18px] font-medium text-gray-900">
              Phone Number<span className="text-red-500">*</span>
            </Label>
            <Input placeholder="Enter your Number" className={inputStyle} />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-[18px] font-medium text-gray-900">
            Street Address<span className="text-red-500">*</span>
          </Label>
          <Input
            placeholder="House Flat/No., Street Name"
            className={inputStyle}
          />
        </div>
        <div className="space-y-2 ">
          <Label className="text-[18px] font-medium text-gray-900">
            Country / Region<span className="text-red-500">*</span>
          </Label>
          <SharedDropdown
            options={countryOptions}
            selectedValue={selectedCountry}
            onValueChange={setSelectedCountry}
            placeholder="Select Country / Region"
            className="bg-[#F0F1F1] w-full md:h-[72px] h-[60px] border border-[#EBECF0] text-base rounded-2xl md:p-6 p-4 focus-visible:ring-1 focus-visible:ring-primary"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-[18px] font-medium text-gray-900">
            Town / City<span className="text-red-500">*</span>
          </Label>
          <Input placeholder="California" className={inputStyle} />
        </div>

        <div className="space-y-2 ">
          <Label className="text-[18px] font-medium text-gray-900">
            District<span className="text-red-500">*</span>
          </Label>
          <SharedDropdown
            options={districtOptions}
            selectedValue={selectedDistrict}
            onValueChange={setSelectedDistrict}
            placeholder="Select District"
            className="bg-[#F0F1F1] w-full md:h-[72px] h-[60px] border border-[#EBECF0] text-base rounded-2xl md:p-6 p-4 focus-visible:ring-1 focus-visible:ring-primary"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-[18px] font-medium text-gray-900">
            Postcode / ZIP (optional)
          </Label>
          <Input placeholder="1258" className={inputStyle} />
        </div>
        <div className="space-y-2">
          <Label className="text-[18px] font-medium text-gray-900">
            Order notes (optional)
          </Label>
          <Textarea
            placeholder="Notes About Your  Order, e.g. Specials Notes for Delivery"
            className="min-h-[120px] max-h-[300px] bg-[#F1F3F4] border-none rounded-xl p-4 focus-visible:ring-1 focus-visible:ring-[#CA8A32] resize-none"
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
