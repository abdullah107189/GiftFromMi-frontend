import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const profileSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string(),
  company: z.string(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfileSettingsForm() {
  const [profileImage, setProfileImage] = useState<string>(
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
  );
  const [imageFile, setImageFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: ProfileFormData) => {
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("company", data.company);

    if (imageFile) {
      formData.append("profileImage", imageFile);
    }

    console.log("Form Data for Backend:", Object.fromEntries(formData));
    alert("Check console to see the FormData structure!");
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="xl:space-y-10 lg:space-y-8 md:space-y-6 space-y-4"
      >
        <div className="space-y-4">
          <h3 className="text-gray-900 font-semibold">Profile Picture</h3>
          {/* profile picture image upload section */}
          <div className="flex items-center flex-wrap md:gap-6 gap-3">
            <Avatar className="md:w-20 md:h-20 w-12 h-12 rounded-full border border-gray-100">
              <AvatarImage src={profileImage} className="object-cover" />
            </Avatar>

            <label className="cursor-pointer">
              <div className="md:px-4 px-2 md:py-2 py-1 border border-gray-200 rounded-[10px] text-sm text-[#364153] font-medium hover:bg-gray-50 transition-all">
                Change Photo
              </div>
              <input
                type="file"
                className="hidden"
                onChange={handleImageChange}
                accept="image/*"
              />
            </label>

            <button
              type="button"
              onClick={() => {
                setProfileImage("");
                setImageFile(null);
              }}
              className="text-[#DF1C41] text-sm font-semibold hover:underline"
            >
              Remove
            </button>

            <span className="text-gray-400 text-sm ml-2">
              JPG, PNG . Max size 5 MB
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-gray-900 font-semibold">Personal Information</h3>
          {/* personal information form fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:gap-6 md:gap-4 gap-2 ">
            <div className="space-y-2">
              <Label className="text-sm text-gray-700">First Name</Label>
              <Input
                {...register("firstName")}
                placeholder="Enter your first name"
                className="bg-[#F3F4F6] border-none md:h-12 h-10 rounded-xl px-4 text-gray-900 focus-visible:ring-1 focus-visible:ring-[#CA8A32] shadow-none"
              />
              {errors.firstName && (
                <p className="text-xs text-red-500">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-gray-700">Last Name</Label>
              <Input
                {...register("lastName")}
                placeholder="Enter your last name"
                className="bg-[#F3F4F6] border-none md:h-12 h-10 rounded-xl px-4 text-gray-900 focus-visible:ring-1 focus-visible:ring-[#CA8A32] shadow-none"
              />
              {errors.lastName && (
                <p className="text-xs text-red-500">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-gray-700">Email Address</Label>
              <Input
                {...register("email")}
                placeholder="Enter your email"
                className="bg-[#F3F4F6] border-none md:h-12 h-10 rounded-xl px-4 text-gray-900 focus-visible:ring-1 focus-visible:ring-[#CA8A32] shadow-none"
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-gray-700">Phone Number</Label>
              <Input
                {...register("phone")}
                placeholder="Enter your number"
                className="bg-[#F3F4F6] border-none md:h-12 h-10 rounded-xl px-4 text-gray-900 focus-visible:ring-1 focus-visible:ring-[#CA8A32] shadow-none"
              />
              {errors.phone && (
                <p className="text-xs text-red-500">{errors.phone.message}</p>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label className="text-sm text-gray-700">Company Name</Label>
              <Input
                {...register("company")}
                placeholder="Enter your company name"
                className="bg-[#F3F4F6] border-none md:h-12 h-10 rounded-xl px-4 text-gray-900 focus-visible:ring-1 focus-visible:ring-[#CA8A32] shadow-none"
              />
              {errors.company && (
                <p className="text-xs text-red-500">{errors.company.message}</p>
              )}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="cursor-pointer text-sm bg-primary text-white px-6 py-2 rounded-[10px]"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
