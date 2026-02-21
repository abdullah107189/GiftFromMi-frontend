import { Link, useLocation, useNavigate } from "react-router";
import authIcon from "@/assets/icons/auth.png";
import logo from "@/assets/icons/logo.png";
import giftBox from "@/assets/banner_and_background/auth.png";
import auth_side from "@/assets/banner_and_background/auth_side.svg";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState, useEffect } from "react";
import SEO from "../shared/SEO";
import {
  useForgotVerifyOtpMutation,
  useResendOtpMutation,
  useVerifyOtpMutation,
} from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { Role } from "@/types";
import { createFormData } from "@/utils/createFormData";
import { ButtonLoading } from "../shared/ButtonLoading";

export type LocationState = {
  email: string;
};

const OTPverification = () => {
  const [verifyOtp, { isLoading: verifyLoading }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: resendLoading }] = useResendOtpMutation();
  const [forgotVerifyOtp, { isLoading: forgotLoading }] =
    useForgotVerifyOtpMutation();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | null;
  const email = state?.email;
  const [value, setValue] = useState("");
  // Log email only when it changes
  useEffect(() => {
    if (email) {
      console.log("email : ", email);
    }
  }, [email]);

  const handleVerify = async () => {
    const otpValue = createFormData({
      email: email!,
      otp: value,
    });
    try {
      let result;
      if (location.state?.type === "forgot") {
        result = await forgotVerifyOtp(otpValue).unwrap();
        toast.success(result.message || "Forgot OTP verified successfully!");
        navigate("/reset-password", { state: { email, token: result?.token } });
      } else {
        result = await verifyOtp(otpValue).unwrap();
        console.log(result.message);
        toast.success(result.message || "Account OTP verified successfully!");
      }

      if (location.state?.type === "register") {
        if (result?.role === Role.admin) {
          window.location.replace("https://shalineheng.thewarriors.team");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      const errorMessage =
        (error as { message?: string })?.message || "OTP verification failed!";
      toast.error(errorMessage);
      console.error("Error verifying OTP:", error);
    }
  };

  const handleResend = async () => {
    const otpValue = createFormData({
      email: email!,
    });
    console.log("Resending OTP for email:", email);

    try {
      if (!email) {
        toast.error("Email is required to resend OTP!");
        return;
      }
      const result = await resendOtp(otpValue).unwrap();
      console.log("result : ", result);
      console.log(result.message || "OTP resent successfully!");
      toast.success(result.message || "OTP resent successfully!");
    } catch (error) {
      const errorMessage =
        (error as { message?: string })?.message || "OTP resend failed!";
      toast.error(errorMessage);
      console.error("Error resending OTP:", error);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <SEO
        title="Verify OTP"
        description="Security verification for your account access."
      />
      {/* Left Side: Brand Logo and Gift Box Image */}
      <Link to={"/"} className="xl:hidden flex">
        <img
          src={logo}
          alt="Logo"
          className="absolute w-18 h-20 object-cover aspect-86/99 left-5 top-5 z-10"
        />
      </Link>
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

      {/* Right Side: OTP Form */}
      <div className="flex lg:w-1/2 justify-center items-center w-full p-3 h-screen border relative">
        <img
          className="absolute md:h-38 h-28 right-10 md:bottom-5 bottom-2 hidden lg:flex"
          src={auth_side}
        ></img>
        <div className="w-full xl:w-125  xl:p-12 lg:p-8 md:p-6 p-3 relative border border-primary/30 bg-background rounded-2xl shadow-sm flex flex-col items-center">
          {/* Header Icon & Title */}
          <div className="flex flex-col md:space-y-4 space-y-2 items-center justify-center xl:mb-8 lg:mb-6 md:mb-4 mb-2 text-center">
            <img
              src={authIcon}
              alt="auth icon"
              className="md:w-20 md:h-20 w-10 h-10"
            />
            <h2 className="xl:text-2xl lg:text-xl md:text-lg text-base font-bold text-gray-900">
              OTP Verification
            </h2>
            <p className="xl:text-base lg:text-sm md:text-xs text-xs text-gray-500 mb-2">
              We have sent a verification code to email address <br />
              <span className="font-semibold text-gray-700">
                {email || "example@example.com"}
              </span>
            </p>
          </div>

          {/* shadcn Input OTP */}
          <div className="lg:mb-8 md:mb-6 mb-4">
            <InputOTP
              maxLength={5}
              value={value}
              onChange={(value) => setValue(value)}
            >
              <InputOTPGroup className="gap-3">
                {[0, 1, 2, 3, 4].map((index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    className={cn(
                      "w-12 h-12 md:w-20 md:h-14 font-semibold rounded-xl! border border-gray-200 text-2xl transition-all",
                      "outline-none! ring-0!",
                      "data-[active=true]:border-[#D19E46] data-[active=true]:bg-[#FDF6ED]",
                    )}
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>

          {/* Verify Button */}
          <Button onClick={handleVerify} className="w-full">
            {verifyLoading || forgotLoading ? (
              <ButtonLoading loadingText="Verifying..." />
            ) : (
              "Verify"
            )}
          </Button>

          {/* Resend Timer */}
          <div className="text-center xl:mt-8 md:mt-6 mt-4">
            <p className="text-gray-500 text-sm md:text-base">
              Didn't receive the code?{" "}
              <button
                onClick={() => handleResend()}
                className="text-[#D19E46] font-bold hover:underline ml-1 cursor-pointer transition-all"
              >
                {resendLoading ? (
                  <ButtonLoading loadingText="Resending..." />
                ) : (
                  "Resend OTP"
                )}
              </button>
            </p>
            <p className="text-xs text-gray-400 mt-2">
              (This code expires in 5 minutes.)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function for class merging (shadcn default)
function cn(...inputs: unknown[]) {
  return inputs.filter(Boolean).join(" ");
}

export default OTPverification;
