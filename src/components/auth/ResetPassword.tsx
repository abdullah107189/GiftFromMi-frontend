/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNavigate, useLocation, Link } from "react-router";
import authIcon from "@/assets/icons/auth.png";
import logo from "@/assets/icons/logo.png";
import giftBox from "@/assets/banner_and_background/auth.png";
import auth_side from "@/assets/banner_and_background/auth_side.svg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SEO from "../shared/SEO";
import { toast } from "sonner";
import { useResetPasswordMutation } from "@/redux/features/auth/auth.api";

const resetSchema = z
    .object({
        password: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

const ResetPassword = () => {
    const [resetPassword] = useResetPasswordMutation();
    const navigate = useNavigate();
    const location = useLocation();

    const form = useForm<z.infer<typeof resetSchema>>({
        resolver: zodResolver(resetSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    async function onSubmit(values: z.infer<typeof resetSchema>) {
        try {
            // example API call
            await resetPassword({
                token: location.state?.token,
                password: values.password,
                password_confirmation: values.confirmPassword,
            }).unwrap();

            toast.success("Password reset successful");
            navigate("/login");
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to reset password");
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <SEO title="Reset Password" description="Set your new password." />

            {/* Left Side */}
            <div className="hidden xl:flex lg:w-1/2 items-start relative h-screen">
                <Link to="/">
                    <img
                        src={logo}
                        alt="Logo"
                        className="absolute w-21.5 h-24.75 object-cover left-15 top-15 z-10"
                    />
                </Link>
                <div className="w-full h-full flex justify-center">
                    <img src={giftBox} className="w-full h-full object-cover" />
                </div>
            </div>

            {/* Right Side */}
            <div className="flex lg:w-1/2 justify-center w-full p-4 relative">
                <img
                    className="absolute h-38 right-5 bottom-5 hidden lg:flex"
                    src={auth_side}
                />

                <div className="w-full xl:w-125 p-8 md:p-12 bg-white relative border border-primary rounded-2xl shadow-sm">
                    {/* Header */}
                    <div className="flex flex-col space-y-4 items-center mb-8">
                        <img src={authIcon} className="w-20 h-20" />
                        <h2 className="text-2xl font-bold">Reset Password</h2>
                        <p className="text-gray-500 text-sm text-center">
                            Enter your new password below.
                        </p>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                            {/* New Password */}
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field, fieldState }) => (
                                    <FormItem>
                                        <FormLabel>New Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Enter new password"
                                                {...field}
                                                className={cn(
                                                    "rounded-xl h-12 border-gray-200",
                                                    fieldState.error && "border-destructive"
                                                )}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Confirm Password */}
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field, fieldState }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Confirm password"
                                                {...field}
                                                className={cn(
                                                    "rounded-xl h-12 border-gray-200",
                                                    fieldState.error && "border-destructive"
                                                )}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button className="w-full h-12 rounded-xl">
                                Reset Password
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
