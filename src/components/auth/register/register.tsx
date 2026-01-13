import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import authIcon from "@/assets/icons/auth.png";
import { Button } from "@/components/ui/button";
import auth_side from "@/assets/banner_and_background/auth_side.svg";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import logo from "@/assets/common/logo.png";
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="flex items-center justify-center xl:p-0 p-6">
      <div className="hidden xl:flex lg:w-1/2 items-start relative">
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
          className="absolute h-38 right-5 bottom-5 hidden lg:flex"
          src={auth_side}
        ></img>
        <div className="w-full xl:w-125 p-8 shadow-sm bg-white relative border border-primary rounded-2xl">
          {/* User Icon Header */}
          <div className="flex flex-col space-y-4 items-center justify-center xl:mb-8 md:mb-6 mb-4">
            <img src={authIcon} alt="auth icons" className="w-21 "></img>
            <h2 className="xl:text-2xl text-xl font-semibold text-gray-900">
              Create New Account
            </h2>
            <p className="text-gray-500">Enter your details to sign up</p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                          "rounded-2xl h-14 bg-white border-gray-200 focus-visible:ring-primary",
                          fieldState.error &&
                            "border-destructive bg-destructive/5 focus-visible:ring-destructive"
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
                          "rounded-2xl h-14 bg-white border-gray-200 focus-visible:ring-primary",
                          fieldState.error &&
                            "border-destructive bg-destructive/5 focus-visible:ring-destructive"
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
                            "rounded-2xl h-14 bg-white border-gray-200 focus-visible:ring-primary",
                            fieldState.error &&
                              "border-destructive bg-destructive/5 focus-visible:ring-destructive"
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

              <Button
                type="submit"
                className="w-full bg-primary text-white h-12 rounded-xl font-semibold transition-all mt-4"
              >
                Register
              </Button>
            </form>
          </Form>

          <div className="text-center xl:mt-8 mt-4">
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

          <div className="relative xl:mt-8 xl:mb-6 my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-400"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-600">
                or connect with
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full rounded-xl border-primary-400 text-gray-600 font-medium flex gap-2.5"
          >
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
