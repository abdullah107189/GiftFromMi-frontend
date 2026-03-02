import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, User } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import profileImg from "@/assets/person/p1.jpg";
import * as z from "zod";
import SharedDropdown from "@/components/shared/SharedDropdown";
import React from "react";
import type { IUser } from "@/types/profile";

const profileSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),

  phone: z
    .string()
    .trim()
    .transform((v) => v.replace(/[^\d+]/g, ""))
    .refine((v) => /^\+?[0-9]\d{6,19}$/.test(v), "Enter a valid phone number"),

  gender: z.string().min(1, "Please select a gender"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function EditProfileForm({ profile }: { profile: IUser }) {
  console.log(profile);
  const [profileImage, setProfileImage] = React.useState<string>(profileImg);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: profile.first_name,
      lastName: profile.last_name,
      email: profile.email,
      phone: profile.profile?.phone,
      gender: profile.gender,
    },
  });

  const onSubmit = (data: ProfileFormValues) => {
    console.log("Updated Data:", data);
    console.log(profileImage);
  };
  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // basic validation
    if (!file.type.startsWith("image/")) return;

    // preview
    const previewUrl = URL.createObjectURL(file);
    setProfileImage(previewUrl);

    // 👉 future: upload to server
    // const formData = new FormData();
    // formData.append("avatar", file);
    // await api.post("/upload-avatar", formData);
  };
  return (
    <div className="border border-(--Text-gray-200,#E5E7EB) shadow-[0_6px_16px_0_rgba(0,0,0,0.12)] xl:rounded-4xl rounded-2xl  xl:p-10 md:p-6 p-3 border-solid">
      {/* Profile Image Section */}
      <div className="relative xl:w-[150px] xl:h-[150px] md:w-[120px] md:h-[120px] w-[100px] h-[100px] xl:mb-12 lg:mb-10 md:mb-8 mb-6">
        <img
          src={profileImage}
          alt="Profile"
          className="w-full h-full rounded-full object-cover"
        />

        <button
          type="button"
          onClick={handleButtonClick}
          className="absolute bottom-1 right-1 bg-[#D48D2B] p-2 rounded-full border shadow-[0_1px_2px_0_rgba(0,0,0,0.30),0_1px_3px_1px_rgba(0,0,0,0.15)] border-white text-white hover:bg-primary transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M4.75583 14.4105L12.5 6.66631L8.82167 2.98798L1.0775 10.7321C0.970786 10.8388 0.895036 10.9725 0.858333 11.1188L0 15.488L4.36833 14.6296C4.515 14.593 4.64917 14.5171 4.75583 14.4105ZM15 4.16631C15.3125 3.85376 15.488 3.42992 15.488 2.98798C15.488 2.54604 15.3125 2.12219 15 1.80964L13.6783 0.487977C13.3658 0.175526 12.9419 0 12.5 0C12.0581 0 11.6342 0.175526 11.3217 0.487977L10 1.80964L13.6783 5.48798L15 4.16631Z"
              fill="white"
            />
          </svg>
        </button>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    First Name <span className="text-[#DF1C41]">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2  size-5 text-primary" />
                      <Input
                        placeholder="Enter Your Name"
                        className="pl-12 md:h-12 h-10 bg-gray-100 placeholder:text-gray-500 text-gray-900 border-none rounded-2xl focus-visible:ring-primary focus-visible:ring-1"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Last Name */}
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-semibold">
                    Last Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2  size-5 text-primary" />
                      <Input
                        placeholder="Enter Your Name"
                        className="pl-12 md:h-12 h-10 bg-gray-100 placeholder:text-gray-500 text-gray-900 border-none rounded-2xl focus-visible:ring-primary focus-visible:ring-1"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Email Address */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-semibold">
                  Email Address <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2  size-5 text-primary" />
                    <Input
                      placeholder="Enter Your Gmail"
                      className="pl-12 md:h-12 h-10 bg-gray-100 placeholder:text-gray-500 text-gray-900 border-none rounded-2xl focus-visible:ring-primary focus-visible:ring-1"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone Number */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-semibold">
                  Phone Number <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2  size-5 text-primary" />
                    <Input
                      placeholder="01 444 333 555"
                      className="pl-12 md:h-12 h-10 bg-gray-100 placeholder:text-gray-500 text-gray-900 border-none rounded-2xl focus-visible:ring-primary focus-visible:ring-1"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Gender Select */}
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-gray-700 font-semibold mb-1">
                  Gender <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <SharedDropdown
                    options={genderOptions}
                    selectedValue={field.value}
                    onValueChange={field.onChange}
                    placeholder="Select Gender"
                    className="md:h-12 h-10 bg-gray-100 border-none rounded-2xl focus:ring-1 focus:ring-primary/20 w-full"
                    triggerIcon={<User className="text-primary size-5" />}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full text-white xl:text-xl lg:text-lg text-base font-medium rounded-2xl"
          >
            Update Changes
          </Button>
        </form>
      </Form>
    </div>
  );
}
