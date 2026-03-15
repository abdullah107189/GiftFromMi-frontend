/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Link, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Mail, MapPin, Phone, Upload, User, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import profileImg from "@/assets/person/p1.jpg";
import SharedDropdown from "@/components/shared/SharedDropdown";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { IUser } from "@/types/profile";
import {
  useUserAvaterRemoveMutation,
  useUserAvaterUploadMutation,
  useUserProfileUpdateMutation,
} from "@/redux/features/user/user.api";
import { createFormData } from "@/utils/createFormData";

const optionalPhoneSchema = z
  .string()
  .trim()
  .refine(
    (value) => !value || /^\+?[0-9\s\-()]{7,20}$/.test(value),
    "Enter a valid phone number",
  );

const profileSchema = z.object({
  first_name: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters"),
  last_name: z.string().trim().optional(),
  email: z.string().trim().email("Invalid email address"),
  phone: optionalPhoneSchema,
  gender: z.enum(["Male", "Female", "Other"]),
  dob: z.string().optional(),
  city: z.string().trim().optional(),
  state: z.string().trim().optional(),
  zip_code: z.string().trim().optional(),
  country: z.string().trim().optional(),
  address: z.string().trim().optional(),
  shipping_address: z.string().trim().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const genderOptions = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Other", value: "Other" },
];

const formatDateForInput = (value?: string | null) => {
  if (!value) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return date.toISOString().slice(0, 10);
};

const getDefaultValues = (profile: IUser): ProfileFormValues => ({
  first_name: profile.first_name ?? "",
  last_name: profile.last_name ?? "",
  email: profile.email ?? "",
  phone: profile.profile?.phone ?? "",
  gender: profile.gender ?? "Other",
  dob: formatDateForInput(profile.dob),
  city: profile.profile?.city ?? "",
  state: profile.profile?.state ?? "",
  zip_code: profile.profile?.zip_code ?? "",
  country: profile.profile?.country ?? "",
  address: profile.profile?.address ?? "",
  shipping_address: profile.profile?.shipping_address ?? "",
});

const getErrorMessage = (error: unknown, fallback: string) => {
  if (
    error &&
    typeof error === "object" &&
    "data" in error &&
    error.data &&
    typeof error.data === "object" &&
    "message" in error.data &&
    typeof error.data.message === "string"
  ) {
    return error.data.message;
  }

  return fallback;
};

export default function EditProfileForm({ profile }: { profile: IUser }) {
  const navigate = useNavigate();
  const [updateProfile, { isLoading: isUpdatingProfile }] =
    useUserProfileUpdateMutation();
  const [uploadAvatar, { isLoading: isUploadingAvatar }] =
    useUserAvaterUploadMutation();
  const [removeAvatar, { isLoading: isRemovingAvatar }] =
    useUserAvaterRemoveMutation();
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const objectUrlRef = React.useRef<string | null>(null);
  const [profileImage, setProfileImage] = React.useState<string>(
    profile.avatarUrl || profile.avatar || profileImg,
  );

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: getDefaultValues(profile),
  });

  React.useEffect(() => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }

    form.reset(getDefaultValues(profile));
    setProfileImage(profile.avatarUrl || profile.avatar || profileImg);
  }, [form, profile]);

  React.useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please choose a valid image file.");
      event.target.value = "";
      return;
    }

    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
    }

    const previewUrl = URL.createObjectURL(file);
    objectUrlRef.current = previewUrl;
    setProfileImage(previewUrl);

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response: any = await uploadAvatar(formData).unwrap();
      toast.success(response?.message || "Profile photo updated successfully.");
    } catch (error) {
      setProfileImage(profile.avatarUrl || profile.avatar || profileImg);
      toast.error(getErrorMessage(error, "Profile photo upload failed."));
    } finally {
      event.target.value = "";
    }
  };

  const handleRemoveAvatar = async () => {
    try {
      const response: any = await removeAvatar({}).unwrap();
      setProfileImage(profileImg);
      toast.success(response?.message || "Profile photo removed successfully.");
    } catch (error) {
      toast.error(getErrorMessage(error, "Profile photo remove failed."));
    }
  };

  const onSubmit = async (values: ProfileFormValues) => {
    const data = createFormData(values);

    try {
      const response: any = await updateProfile(data).unwrap();
      console.log(response);
      toast.success(response?.message || "Profile updated successfully.");
      navigate("/customer-dashboard");
    } catch (error) {
      toast.error(getErrorMessage(error, "Profile update failed."));
    }
  };

  const isBusy = isUpdatingProfile || isUploadingAvatar || isRemovingAvatar;

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_14px_32px_rgba(15,23,42,0.06)] md:p-7 xl:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <div className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-primary">
              Update Profile
            </div>
            <h1 className="text-2xl font-semibold text-slate-950 md:text-3xl">
              Keep your account details up to date
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
              This form updates your customer profile information. Basic account
              data and address fields are grouped together so the user can edit
              everything from one page.
            </p>
          </div>

          <Link to="/customer-dashboard">
            <Button variant="outline" className="border-slate-300">
              <ArrowLeft className="size-4" />
              Back To Profile
            </Button>
          </Link>
        </div>
      </div>

      <div className="rounded-[32px] border border-slate-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
        <div className="border-b border-slate-200 bg-[linear-gradient(135deg,#fff7eb_0%,#ffffff_48%,#f8fafc_100%)] px-5 py-6 md:px-8 xl:px-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-4 border-white shadow-lg md:h-28 md:w-28">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-slate-950 md:text-2xl">
                  {`${profile.first_name} ${profile.last_name}`.trim()}
                </h2>
                <p className="text-sm text-slate-600">{profile.email}</p>
                <div className="flex flex-wrap gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="border-slate-300 bg-white"
                    disabled={isBusy}
                    onClick={handleButtonClick}
                  >
                    <Upload className="size-4" />
                    {isUploadingAvatar ? "Uploading..." : "Change Photo"}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                    disabled={isBusy}
                    onClick={handleRemoveAvatar}
                  >
                    <X className="size-4" />
                    {isRemovingAvatar ? "Removing..." : "Remove Photo"}
                  </Button>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
              JPG, PNG, or WEBP work best. The photo updates separately from the
              profile form so the user gets instant feedback.
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 p-5 md:p-8 xl:p-10"
          >
            <div className="space-y-5">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-slate-950">
                  Basic information
                </h3>
                <p className="text-sm leading-6 text-slate-600">
                  These details identify the customer account and are also used
                  in order communication.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <ProfileField
                  form={form}
                  name="first_name"
                  label="First Name"
                  placeholder="Enter your first name"
                  icon={<User className="size-5 text-primary" />}
                />
                <ProfileField
                  form={form}
                  name="last_name"
                  label="Last Name"
                  placeholder="Enter your last name"
                  icon={<User className="size-5 text-primary" />}
                />
                <ProfileField
                  form={form}
                  name="email"
                  label="Email Address"
                  placeholder="Enter your email address"
                  icon={<Mail className="size-5 text-primary" />}
                />
                <ProfileField
                  form={form}
                  name="phone"
                  label="Phone Number"
                  placeholder="Enter your phone number"
                  icon={<Phone className="size-5 text-primary" />}
                />

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-sm font-medium text-slate-700">
                        Gender
                      </FormLabel>
                      <FormControl>
                        <SharedDropdown
                          options={genderOptions}
                          selectedValue={field.value}
                          onValueChange={field.onChange}
                          placeholder="Select gender"
                          className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-slate-900"
                          triggerIcon={<User className="size-5 text-primary" />}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dob"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-slate-700">
                        Date Of Birth
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          className="h-12 rounded-2xl border-none bg-slate-100 px-4 text-slate-900 shadow-none focus-visible:ring-primary/20"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-5 border-t border-slate-200 pt-8">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-slate-950">
                  Address information
                </h3>
                <p className="text-sm leading-6 text-slate-600">
                  Address fields help prefill checkout and shipping details.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <ProfileField
                  form={form}
                  name="city"
                  label="City"
                  placeholder="Enter your city"
                  icon={<MapPin className="size-5 text-primary" />}
                />
                <ProfileField
                  form={form}
                  name="state"
                  label="State"
                  placeholder="Enter your state"
                  icon={<MapPin className="size-5 text-primary" />}
                />
                <ProfileField
                  form={form}
                  name="zip_code"
                  label="ZIP Code"
                  placeholder="Enter your ZIP code"
                  icon={<MapPin className="size-5 text-primary" />}
                />
                <ProfileField
                  form={form}
                  name="country"
                  label="Country"
                  placeholder="Enter your country"
                  icon={<MapPin className="size-5 text-primary" />}
                />
              </div>

              <div className="grid gap-5 lg:grid-cols-2">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-slate-700">
                        Address
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter your address"
                          className="min-h-28 rounded-3xl border-none bg-slate-100 px-4 py-3 text-slate-900 shadow-none focus-visible:ring-primary/20"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="shipping_address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-slate-700">
                        Shipping Address
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter your shipping address"
                          className="min-h-28 rounded-3xl border-none bg-slate-100 px-4 py-3 text-slate-900 shadow-none focus-visible:ring-primary/20"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-200 pt-8 sm:flex-row sm:justify-end">
              <Link to="/customer-dashboard">
                <Button variant="outline" className="border-slate-300">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={isBusy} className="sm:min-w-48">
                {isUpdatingProfile ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

type ProfileFieldName =
  | "first_name"
  | "last_name"
  | "email"
  | "phone"
  | "city"
  | "state"
  | "zip_code"
  | "country";

type ProfileFieldProps = {
  form: ReturnType<typeof useForm<ProfileFormValues>>;
  name: ProfileFieldName;
  label: string;
  placeholder: string;
  icon: React.ReactNode;
};

function ProfileField({
  form,
  name,
  label,
  placeholder,
  icon,
}: ProfileFieldProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-medium text-slate-700">
            {label}
          </FormLabel>
          <FormControl>
            <div className="relative">
              <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
                {icon}
              </div>
              <Input
                placeholder={placeholder}
                className="h-12 rounded-2xl border-none bg-slate-100 pl-12 text-slate-900 shadow-none focus-visible:ring-primary/20"
                {...field}
                value={field.value ?? ""}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
