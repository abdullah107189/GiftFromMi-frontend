import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import authIcon from "@/assets/icons/auth.png";
import logo from "@/assets/common/logo.png";
import giftBox from "@/assets/banner_and_background/auth.png";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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

const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "The email address you entered is wrong!" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log(values);
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      {/* Left Side: Brand Logo and Gift Box Image */}
      <div className="hidden xl:flex lg:w-1/2 items-start relative h-screen">
        <Link to={"/"}>
          <img
            src={logo}
            alt="Logo"
            className="absolute w-21.5 h-24.75 object-cover aspect-86/99 left-15 top-15 z-10"
          />
        </Link>
        <div className="w-full h-full flex justify-center">
          <img
            src={giftBox}
            alt="Gift Box Background"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex lg:w-1/2 justify-center w-full p-4">
        <div className="w-full xl:w-125 p-8 md:p-12 bg-white relative border border-primary rounded-2xl shadow-sm">
          {/* Header Icon & Title */}
          <div className="flex flex-col space-y-4 items-center justify-center mb-8">
            <img src={authIcon} alt="auth icon" className="w-20 h-20" />
            <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
            <p className="text-gray-500 text-center">
              Glad to see you again. Log in to your account.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Field with Error Styling from Image */}
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
                        placeholder="demo@gmail.com"
                        {...field}
                        className={cn(
                          "rounded-2xl h-14 bg-white border-gray-200 focus-visible:ring-primary transition-all",
                          fieldState.error &&
                            "border-destructive bg-destructive/5 focus-visible:ring-destructive text-destructive"
                        )}
                      />
                    </FormControl>
                    <FormMessage className="text-destructive text-sm font-normal flex items-center gap-1 pt-1" />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-gray-600 text-sm font-medium">
                      Password <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••••••"
                          {...field}
                          className={cn(
                            "rounded-2xl h-14 bg-white border-gray-200 focus-visible:ring-primary pr-12",
                            fieldState.error &&
                              "border-destructive bg-destructive/5 focus-visible:ring-destructive"
                          )}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showPassword ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    className="border-gray-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-600 cursor-pointer"
                  >
                    Keep me login
                  </label>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-sm font-semibold text-primary hover:underline transition-all"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white h-14 rounded-2xl text-lg font-bold shadow-md shadow-primary/10 transition-all mt-2"
              >
                Login
              </Button>
            </form>
          </Form>

          {/* Footer Link */}
          <div className="text-center mt-10">
            <p className="text-gray-500 text-sm">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-primary font-bold hover:underline ml-1"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
