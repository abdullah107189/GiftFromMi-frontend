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

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  function onSubmit(values: z.infer<typeof formSchema>) {
    navigate("/otp", { state: { email: values.email } });
    console.log(values);
  }

  return (
    <div className="flex items-center justify-center xl:p-0 p-3 h-screen relative">
      <div className="hidden xl:flex lg:w-1/2 items-start ">
        <Link to={"/"}>
          <img
            src={logo}
            alt="Logo"
            className="absolute w-21.5 h-24.75 object-cover aspect-86/99 left-15 top-15"
          />
        </Link>
        <div className="h-screen flex justify-center">
          <img
            src={giftBox}
            alt="Gift Box"
            className=" w-full h-full object-cover"
          />
        </div>
      </div>
      {/* Right Side: Form */}
      <div className="flex lg:w-1/2 justify-center w-full">
        <img
          className="absolute md:h-38 h-28 right-5 md:bottom-5 bottom-2 hidden lg:flex"
          src={auth_side}
        ></img>
        <div className="w-full xl:w-125 xl:p-8 lg:p-6 md:p-4 p-2 shadow-sm bg-white relative border border-primary rounded-2xl">
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
                name="fullName"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-gray-500 font-medium text-sm">
                      Full Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your Name"
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

              <Button type="submit" className="w-full md:mt-3 mt-2">
                Register
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

          <div className="relative xl:mt-8 xl:mb-6 lg:my-4 my-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-400"></span>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                or connect with
              </span>
            </div>
          </div>

          <Button variant="outline" className="w-full">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              loading="lazy"
              alt="google logo"
              className="h-8 w-8"
            />
            Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
