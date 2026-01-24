import { Link, useLocation } from "react-router";
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

export type LocationState = {
  email: string;
};

const OTPVerification = () => {
  const location = useLocation();
  const state = location.state as LocationState | null;
  const email = state?.email;
  const [value, setValue] = useState("");
  const [timeLeft, setTimeLeft] = useState(37);

  // Log email only when it changes
  useEffect(() => {
    if (email) {
      console.log("email : ", email);
    }
  }, [email]);

  // Timer effect
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleVerify = () => {
    console.log("Verifying OTP:", value);
    console.log({
      email,
      otp: value,
    });
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
      <div className="flex lg:w-1/2 justify-center w-full p-3 relative">
        <div className="xl:h-38 lg:h-30 md:h-20 h-10! absolute   right-5 bottom-5 hidden lg:flex">
          <img className="w-full h-full" src={auth_side} alt="decoration" />
        </div>
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
                {email || "robertjohnson@example.com"}
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
                      "w-12 h-12 md:w-20 md:h-14 font-semibold rounded-xl! focus:ring-0 border border-gray-200 text-2xl",
                      index === 2 && "border-primary bg-primary/5",
                    )}
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>

          {/* Verify Button */}
          <Button
            onClick={handleVerify}
            disabled={value.length < 5}
            className="w-full"
          >
            Verify
          </Button>

          {/* Resend Timer */}
          <div className="text-center xl:mt-8 md:mt-6 mt-4">
            <p className="text-gray-500">
              Resend code in{" "}
              <span className="text-primary-400 ">{formatTime(timeLeft)}</span>
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

export default OTPVerification;
