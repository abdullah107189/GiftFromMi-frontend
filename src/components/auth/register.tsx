/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import authIcon from "@/assets/icons/auth.png";
import auth_side from "@/assets/banner_and_background/auth_side.svg";
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
import logo from "@/assets/icons/logo.png";
import giftBox from "@/assets/banner_and_background/auth.png";
import { cn } from "@/lib/utils";
import SEO from "../shared/SEO";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { createFormData } from "@/utils/createFormData";
import { ButtonLoading } from "../shared/ButtonLoading";
const formSchema = z.object({
  first_name: z.string().min(2, { message: "Full name is required" }),
  last_name: z.string().min(2, { message: "Full name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  password_confirmation: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [registerUser, { isLoading }] = useRegisterMutation(); // RTK Query Mutation
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  // --- Submit Function ---
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.password !== values.password_confirmation) {
      toast.error("Password doesn't match");
      return;
    }
    const formData = createFormData({
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      password: values.password,
      password_confirmation: values.password_confirmation,
    });

    try {
      const result = await registerUser(formData).unwrap();
      console.log("Registration Success:", result);
      const expiryTime = 5 * 60 * 1000;
      const currentTime = new Date().getTime();
      const otpExpiresAt = new Date(currentTime + expiryTime).toISOString();
      localStorage.setItem("otpExpiresAt", otpExpiresAt);

      // Registration success hole OTP page e niye jabe
      navigate("/otp", { state: { email: values.email, type: "register" } });
    } catch (error) {
      const errorMessage =
        ((error as any)?.data?.message as string) || "Registration failed";
      toast.error(errorMessage);
      console.error("Registration Error:", (error as any)?.data?.message);
    }
  }
  return (
    <section className="flex items-center justify-center xl:p-0 p-3 relative">
      <SEO
        title="Register"
        description="Create a new account and start sending personalized gifts."
      />

      <div className="hidden xl:flex lg:w-1/2  items-start ">
        <Link to={"/"}>
          <img
            src={logo}
            alt="Logo"
            className="fixed w-21.5 h-24.75 z-10 object-cover aspect-86/99 left-15 top-15"
          />
        </Link>
        <div className="top-0 bottom-0 right-1/2 left-0 fixed justify-center">
          <img
            src={giftBox}
            alt="Gift Box"
            className=" w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="flex lg:w-1/2 justify-center w-full py-10">
        <img
          className="absolute md:h-38 h-28 right-5 md:bottom-5 bottom-2 hidden lg:flex"
          src={auth_side}
        ></img>
        <div className="w-full xl:w-125 h-auto xl:p-8 lg:p-6 md:p-4 p-2 shadow-sm bg-white relative border border-primary rounded-2xl">
          {/* User Icon Header */}
          <div className="flex flex-col md:space-y-4 space-y-2 items-center justify-center xl:mb-8 md:mb-6 mb-4">
            <img src={authIcon} alt="auth icons" className="md:w-21 w-16"></img>
            <h2 className="xl:text-2xl md:text-xl text-lg font-semibold text-gray-900">
              Create New Account
            </h2>
            <p className="md:text-base text-sm text-gray-500">
              Enter your details to sign up
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="md:space-y-5 space-y-2"
            >
              <FormField
                control={form.control}
                name="first_name"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-gray-500 font-medium text-sm">
                      First Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter first your Name"
                        className={cn(
                          "rounded-2xl md:h-14 h-12 bg-white border-gray-200 focus-visible:ring-primary",
                          fieldState.error &&
                          "border-destructive bg-destructive/5 focus-visible:ring-destructive",
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-gray-500 font-medium text-sm">
                      Last Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter last your Name"
                        className={cn(
                          "rounded-2xl md:h-14 h-12 bg-white border-gray-200 focus-visible:ring-primary",
                          fieldState.error &&
                          "border-destructive bg-destructive/5 focus-visible:ring-destructive",
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-gray-600 text-sm font-medium">
                      Email Address <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your email"
                        className={cn(
                          "rounded-2xl md:h-14 h-12 bg-white border-gray-200 focus-visible:ring-primary",
                          fieldState.error &&
                          "border-destructive bg-destructive/5 focus-visible:ring-destructive",
                        )}
                      />
                    </FormControl>
                    <FormMessage className="text-destructive text-sm font-normal flex items-center gap-1 pt-1" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-gray-500 font-medium text-sm">
                      Password <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          {...field}
                          placeholder="Enter your password"
                          className={cn(
                            "rounded-2xl md:h-14 h-12 bg-white border-gray-200 focus-visible:ring-primary",
                            fieldState.error &&
                            "border-destructive bg-destructive/5 focus-visible:ring-destructive",
                          )}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/3 cursor-pointer -trangray-y-1/2 text-gray-400"
                        >
                          {showPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password_confirmation"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-gray-500 font-medium text-sm">
                      Confirm Password <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          {...field}
                          placeholder="Enter your confirm password"
                          className={cn(
                            "rounded-2xl md:h-14 h-12 bg-white border-gray-200 focus-visible:ring-primary",
                            fieldState.error &&
                            "border-destructive bg-destructive/5 focus-visible:ring-destructive",
                          )}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/3 cursor-pointer -trangray-y-1/2 text-gray-400"
                        >
                          {showPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full md:mt-3 mt-2">
                {
                  isLoading ? (
                    <ButtonLoading loadingText="Registering..." />
                  ) : (
                    "Register"
                  )
                }
              </Button>
            </form>
          </Form>

          <div className="text-center xl:mt-8 md:mt-4 mt-2">
            <p className=" text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
          </div>



        </div>
      </div>
    </section>
  );
};

export default Register;
