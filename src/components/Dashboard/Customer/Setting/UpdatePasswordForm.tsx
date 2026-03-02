import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { PasswordField } from "./PasswordField";
import { toast } from "sonner";
import { useChangePasswordMutation } from "@/redux/features/auth/auth.api";

const formSchema = z
  .object({
    old_password: z.string().min(8, "Min 8 characters"),
    password: z.string().min(8, "Min 8 characters"),
    password_confirmation: z.string().min(8, "Min 8 characters"),
  })
  .refine((v) => v.password === v.password_confirmation, {
    path: ["password_confirmation"],
    message: "Passwords do not match",
  });

type FormValues = z.infer<typeof formSchema>;

type Props = {
  verifyToken: string;
  onBack?: () => void;
};

export default function UpdatePasswordForm({ verifyToken }: Props) {
  const [updatePassword, { isLoading: updatePasswordLoading }] = useChangePasswordMutation();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      old_password: "",
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    // await fetch("/api/auth/update-password", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${verifyToken}`,
    //   },
    //   body: JSON.stringify(values),
    // });
    console.log(verifyToken);
    console.log(values);
    try {
      const result = await updatePassword(values);
      if (result.error) {
        // Check if it's an RTK Query error with data property
        if ('data' in result.error && result.error.data) {
          const errorData = result.error.data as { message?: string };
          toast.error(errorData.message || "Password update failed");
        } else {
          toast.error("Password update failed");
        }
      } else {
        toast.success("Password updated successfully");
      }
      console.log(result);

    } catch (error) {
      console.log(error);
      toast.error("Password updated failed");
    }
  };
  return (
    <div className="w-full xl:p-6 md:p-4">
      <Card className="xl:rounded-4xl lg:rounded-3xl md:rounded-2xl rounded-xl border border-slate-200 bg-white shadow-[0_6px_16px_rgba(0,0,0,0.12)]">
        <CardContent className="xl:p-10 lg:p-8 md:p-6 p-3 xl:space-y-10 lg:space-y-8 md:space-y-6 space-y-3">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
              <PasswordField
                control={form.control}
                name="old_password"
                label="Password"
                autoComplete="current-password"
              />
              <PasswordField
                control={form.control}
                name="password"
                label="New Password"
                autoComplete="new-password"
              />
              <PasswordField
                control={form.control}
                name="password_confirmation"
                label="Confirm Password"
                autoComplete="new-password"
              />

              <Button
                disabled={updatePasswordLoading}
                type="submit"
                className="xl:h-18 md:h-12 h-10 w-full rounded-2xl text-lg font-medium"
              >
                Update Password
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
