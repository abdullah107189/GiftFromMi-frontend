import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { PasswordField } from "./PasswordField";
import { toast } from "sonner";

const formSchema = z
  .object({
    password: z.string().min(8, "Min 8 characters"),
    newPassword: z.string().min(8, "Min 8 characters"),
    confirmPassword: z.string().min(8, "Min 8 characters"),
  })
  .refine((v) => v.newPassword === v.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type FormValues = z.infer<typeof formSchema>;

type Props = {
  verifyToken: string;
  onBack: () => void;
};

export default function UpdatePasswordForm({ verifyToken, onBack }: Props) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: {
    newPassword: string;
    confirmPassword: string;
  }) => {
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
    toast.success("Password updated successfully");
  };
  return (
    <div className="w-full p-6">
      <Card className="rounded-4xl border border-slate-200 bg-white shadow-[0_6px_16px_rgba(0,0,0,0.12)]">
        <CardContent className="p-10 space-y-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
              <PasswordField
                control={form.control}
                name="password"
                label="Password"
                autoComplete="current-password"
              />
              <PasswordField
                control={form.control}
                name="newPassword"
                label="New Password"
                autoComplete="new-password"
              />
              <PasswordField
                control={form.control}
                name="confirmPassword"
                label="Confirm Password"
                autoComplete="new-password"
              />

              <Button
                type="submit"
                className="h-[72px] w-full rounded-2xl text-lg font-medium
                           bg-gradient-to-r from-amber-500 to-amber-700
                           hover:from-amber-600 hover:to-amber-800"
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
