import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Link } from "react-router";
import authIcon from "@/assets/icons/auth.png";
import logo from "@/assets/common/logo.png";
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

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

const ForgotPassword = () => {
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
    console.log("Password reset requested for:", values.email);
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Link to={"/"} className="xl:hidden flex">
        <img
          src={logo}
          alt="Logo"
          className="absolute w-18 h-20 object-cover aspect-86/99 left-5 top-5 z-10"
        />
      </Link>
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

      {/* Right Side: Forgot Password Form */}
      <div className="flex lg:w-1/2 justify-center w-full p-4 relative">
        <img
          className="absolute h-38 right-5 bottom-5 hidden lg:flex"
          src={auth_side}
          alt="decoration"
        />
        <div className="w-full xl:w-125 p-8 md:p-12 bg-white relative border border-primary rounded-2xl shadow-sm">
          {/* Header Icon & Title */}
          <div className="flex flex-col space-y-4 items-center justify-center mb-8">
            <div className="relative">
              <img src={authIcon} alt="auth icon" className="w-20 h-20" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Forgot Password
            </h2>
            <p className="text-gray-500 text-center text-sm px-2">
              Enter your email address and we'll send you password reset
              instructions.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-gray-600 text-sm font-medium">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="robertjohnson@example.com"
                        {...field}
                        className={cn(
                          "rounded-xl h-12 bg-white border-gray-200 focus-visible:ring-primary transition-all",
                          fieldState.error &&
                            "border-destructive bg-destructive/5 focus-visible:ring-destructive text-destructive"
                        )}
                      />
                    </FormControl>
                    <FormMessage className="text-destructive text-xs" />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Link to={"/otp"}>
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white h-12 rounded-xl font-semibold transition-all"
                >
                  Forgot Password
                </Button>
              </Link>
            </form>
          </Form>

          {/* Footer Link */}
          <div className="text-center mt-10">
            <Link
              to="/login"
              className="text-gray-500 text-sm hover:text-primary transition-colors"
            >
              Don't have access anymore?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
