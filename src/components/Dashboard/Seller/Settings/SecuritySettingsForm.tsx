import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Must include uppercase")
      .regex(/[a-z]/, "Must include lowercase")
      .regex(/[0-9]/, "Must include numbers")
      .regex(/[^A-Za-z0-9]/, "Must include special characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type PasswordFormData = z.infer<typeof passwordSchema>;

export default function SecuritySettingsForm() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: PasswordFormData) => {
    try {
      console.log("Password Change Data:", data);

      // there is api call !
      // await updatePassword(data);

      toast.success("Password Updated Successfully!");
      reset();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="w-full bg-white lg:p-6 md:p-4 p-3 rounded-2xl border border-gray-300">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="xl:space-y-8 lg:space-y-6 md:space-y-4 space-y-2"
      >
        <div className="flex items-start md:gap-4 gap-2">
          <div className="p-2.5 bg-[#EFF6FF] rounded-[10px]">
            <Lock className="w-5 h-5 text-[#155DFC]" />
          </div>
          <div className="space-y-1">
            <h3 className=" text-gray-900">Change Password</h3>
            <p className="text-sm text-gray-500">
              Update your password to keep your account secure
            </p>
          </div>
        </div>

        <div className="md:space-y-4 space-y-2">
          <div className="space-y-2">
            <Label className="text-gray-900">Current Password</Label>
            <div className="relative">
              <Input
                type={showCurrent ? "text" : "password"}
                {...register("currentPassword")}
                placeholder="Enter current password"
                className="bg-[#F8F9FB] border-none md:h-12 h-10 rounded-xl px-4 pr-12 text-gray-900 focus-visible:ring-1 focus-visible:ring-[#CA8A32] shadow-none"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showCurrent ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.currentPassword && (
              <p className="text-xs text-red-500">
                {errors.currentPassword.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-gray-900">New Password</Label>
            <div className="relative">
              <Input
                type={showNew ? "text" : "password"}
                {...register("newPassword")}
                placeholder="Enter new password"
                className="bg-[#F8F9FB] border-none md:h-12 h-10 rounded-xl px-4 pr-12 text-gray-900 focus-visible:ring-1 focus-visible:ring-[#CA8A32] shadow-none"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-xs text-red-500">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-gray-900">Confirm New Password</Label>
            <div className="relative">
              <Input
                type={showConfirm ? "text" : "password"}
                {...register("confirmPassword")}
                placeholder="Enter new password"
                className="bg-[#F8F9FB] border-none md:h-12 h-10 rounded-xl px-4 pr-12 text-gray-900 focus-visible:ring-1 focus-visible:ring-[#CA8A32] shadow-none"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        <div className="bg-[#EFF6FF] md:p-4 p-2 rounded-lg">
          <p className="text-sm text-[#1C398E]">
            Password must be at least 8 characters long and include uppercase,
            lowercase, numbers, and special characters.
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary mt-1 md:mt-0 text-sm text-white px-6 py-2 rounded-[10px] disabled:opacity-50"
        >
          {isSubmitting ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}
