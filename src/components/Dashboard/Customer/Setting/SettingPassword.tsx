import * as React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const schema = z.object({
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Minimum 8 characters"),
});
type FormValues = z.infer<typeof schema>;
type Props = {
  handleVerified: (token: string) => void;
};
export default function SettingPassword({ handleVerified }: Props) {
  const [show, setShow] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { password: "" },
  });

  const onSubmit = async (values: { password: string }) => {
    // 1) server verify
    // const res = await fetch("/api/auth/verify-password", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(values),
    // });
    // if (!res.ok) {
    //   toast.error("Invalid password");
    //   return;
    // }
    // const data = await res.json();
    // ✅ server should return short-lived token
    console.log(values);
    handleVerified("token");
  };

  return (
    <div className="w-full flex items-start justify-center bg-background">
      {/* Outer frame (1025 x 226, padding 40, gap 63, radius 32, border, shadow) */}
      <Card className="md:w-[1025px] border-none shadow-none p-0">
        <CardContent className="h-full xl:p-10 lg:p-8 md:p-6 p-4  xl:rounded-4xl lg:rounded-3xl md:rounded-2xl rounded-xl border border-[#ECECED] bg-white shadow-[0_6px_16px_rgba(0,0,0,0.12)]">
          <Form {...form}>
            <form
              id="password-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="h-full flex flex-col items-stretch gap-[63px]"
            >
              {/* Password block */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-[16px] font-normal text-[#111827]">
                      Password
                    </FormLabel>

                    <FormControl>
                      {/* Input container to match the big soft gray field */}
                      <div className="relative mt-3">
                        {/* Left lock icon */}
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-6">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M19.5 7.5H16.5V5.25C16.5 4.05653 16.0259 2.91193 15.182 2.06802C14.3381 1.22411 13.1935 0.75 12 0.75C10.8065 0.75 9.66193 1.22411 8.81802 2.06802C7.97411 2.91193 7.5 4.05653 7.5 5.25V7.5H4.5C4.10218 7.5 3.72064 7.65804 3.43934 7.93934C3.15804 8.22064 3 8.60218 3 9V19.5C3 19.8978 3.15804 20.2794 3.43934 20.5607C3.72064 20.842 4.10218 21 4.5 21H19.5C19.8978 21 20.2794 20.842 20.5607 20.5607C20.842 20.2794 21 19.8978 21 19.5V9C21 8.60218 20.842 8.22064 20.5607 7.93934C20.2794 7.65804 19.8978 7.5 19.5 7.5ZM9 5.25C9 4.45435 9.31607 3.69129 9.87868 3.12868C10.4413 2.56607 11.2044 2.25 12 2.25C12.7956 2.25 13.5587 2.56607 14.1213 3.12868C14.6839 3.69129 15 4.45435 15 5.25V7.5H9V5.25ZM19.5 19.5H4.5V9H19.5V19.5ZM13.125 14.25C13.125 14.4725 13.059 14.69 12.9354 14.875C12.8118 15.06 12.6361 15.2042 12.4305 15.2894C12.225 15.3745 11.9988 15.3968 11.7805 15.3534C11.5623 15.31 11.3618 15.2028 11.2045 15.0455C11.0472 14.8882 10.94 14.6877 10.8966 14.4695C10.8532 14.2512 10.8755 14.025 10.9606 13.8195C11.0458 13.6139 11.19 13.4382 11.375 13.3146C11.56 13.191 11.7775 13.125 12 13.125C12.2984 13.125 12.5845 13.2435 12.7955 13.4545C13.0065 13.6655 13.125 13.9516 13.125 14.25Z"
                              fill="#CA8A32"
                            />
                          </svg>
                        </div>

                        <Input
                          {...field}
                          type={show ? "text" : "password"}
                          placeholder="********"
                          autoComplete="new-password"
                          className="
                            xl:h-18 md:h-12 h-10  w-full
                            rounded-2xl
                            border border-transparent
                            bg-[#F6F6F7]
                            pl-[60px] pr-[60px]
                            text-[18px] text-[#111827]
                            placeholder:text-[#9CA3AF]
                            focus-visible:ring-0 focus-visible:ring-offset-0
                          "
                        />

                        {/* Right eye toggle */}
                        <button
                          type="button"
                          onClick={() => setShow((s) => !s)}
                          className="absolute inset-y-0 right-0 flex items-center pr-6 text-[#9CA3AF] hover:text-[#6B7280]"
                          aria-label={show ? "Hide password" : "Show password"}
                        >
                          {show ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </FormControl>

                    <FormMessage className="mt-2" />
                  </FormItem>
                )}
              />

              {/* Button: big, rounded, amber gradient like screenshot */}
            </form>
          </Form>
        </CardContent>

        <Button
          form="password-form"
          type="submit"
          className=" md:mt-3 mt-0
                  text-[18px] w-full font-medium
                  text-white
                "
        >
          Update Password
        </Button>
      </Card>
    </div>
  );
}
