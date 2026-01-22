import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Eye, EyeOff, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import React from "react";
type PasswordFieldProps = {
  control: any;
  name: "password" | "newPassword" | "confirmPassword";
  label: string;
  autoComplete?: string;
};
export function PasswordField({
  control,
  name,
  label,
  autoComplete,
}: PasswordFieldProps) {
  const [show, setShow] = React.useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel className="text-base font-medium text-gray-700">
            {label}
          </FormLabel>

          <FormControl>
            <div className="relative">
              <Lock className="absolute left-6 top-1/2 h-5 w-5 -translate-y-1/2 text-amber-600" />

              <Input
                {...field}
                type={show ? "text" : "password"}
                autoComplete={autoComplete}
                placeholder="* * * * * * * *"
                className="h-[84px] rounded-2xl bg-slate-100 pl-14 pr-14 text-lg focus-visible:ring-0"
              />

              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                aria-label={show ? "Hide password" : "Show password"}
              >
                {show ? (
                  <EyeOff className="h-6 w-6" />
                ) : (
                  <Eye className="h-6 w-6" />
                )}
              </button>
            </div>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
