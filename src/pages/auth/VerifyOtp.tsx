import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { verifyForgotPasswordOtpApi } from "@/api/auth";
import { toast } from "react-toastify";
import axios from "axios";

export default function VerifyForgotPasswordOtp() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "";

  const mutation = useMutation({
    mutationFn: verifyForgotPasswordOtpApi,
    onSuccess: () => {
      toast.success("OTP verified successfully");
      navigate(`/auth/set-new-password?email=${encodeURIComponent(email)}`);
    },
    onError: (error) => {
      if (import.meta.env.DEV) {
        console.error(error);
      }
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data?.message || "OTP verification failed");
      } else {
        toast.error("Something went wrong");
      }
    },
  });

  const handleSubmit = () => {
    mutation.mutate({ otp, email });
  };

  return (
    <div className="container  mx-auto h-full flex flex-col justify-center max-w-md">
      <div className="mt-20 md:mt-24">
        <div className="">
          <h1 className="text-3xl text-center lg:text-start md:text-3xl lg:text-4xl font-bold">
            Change your password
          </h1>{" "}
        </div>
        <p className="text-md pt-4 text-[#393E46] text-center lg:text-start ">
          Enter the otp code you received in your email.
        </p>

        <h1 className="mt-6 text-[#393E46]">OTP Code:</h1>
        <div className="flex justify-center border bg-[#F4F0EC] py-2 rounded-xl ">
          <InputOTP maxLength={6} value={otp} onChange={setOtp} className="w-100">
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <button
          onClick={handleSubmit}
          disabled={mutation.isPending || otp.length < 6}
          className="btn btn-neutral w-full lg:w-110 bg-[#F97316] text-white mt-8 border rounded-3xl"
          type="button"
        >
          <div className="flex justify-center items-center">
            <div>
              <h1 className="text-xl">
                {mutation.isPending ? "Verifying..." : "Proceed to reset password"}
              </h1>
            </div>
            <div>
              <img src="/stash_arrow-down-duotone.svg" alt="" />
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}