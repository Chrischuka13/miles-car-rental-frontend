import { validateForgotPasswordSchema, type forgotPasswordSchemaType } from "@/lib/schemaTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { forgotPasswordApi } from "@/api/auth";
import { toast } from "react-toastify";
import axios from "axios";
import LoadingButton from "@/components/ui/authButtons";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } =useForm<forgotPasswordSchemaType>({
  resolver: zodResolver(validateForgotPasswordSchema),
});

  const mutation = useMutation({
    mutationFn: forgotPasswordApi,
    onSuccess: (_, variables) => {
      toast.success("Reset link sent successfully");
      navigate(`/auth/verify-otp?email=${encodeURIComponent(variables.email)}`);
    },
    onError: (error) => {
      if (import.meta.env.DEV) {
        console.error(error);
      }
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      } else {
        toast.error("Something went wrong");
      }
    },
  });

 const onSubmitForm: SubmitHandler<forgotPasswordSchemaType> = async (data) => {
  mutation.mutate(data);
};

  return (
    <div className="">
      <div className="">
        <div className="flex gap-1 mt-10 text-[#4B5563] pb-8 ">
          <Link to="/auth/login">
            <ArrowLeft />
          </Link>
          <p>Back to sign in</p>
        </div>
        <h1 className="text-4xl font-semibold mb-4">Forgot password?</h1>
        <p className="text-sm text-[#393E46] text-[18px] mb-6">
          Enter the email associated with your account we'll send you a link to
          reset your password{" "}
        </p>
        <form
          onSubmit={handleSubmit(onSubmitForm)}
          className=""
        >
          <div>
            <p className="mb-2">
              Email Address<span className="text-red-700">*</span>
            </p>
            <input
              type="email"
              {...register("email")}
              className="p-3 px-4 border border-Browny rounded-[24px] w-full text-[#A1A1A1] mb-2 "
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors?.email.message}</p>
            )}
          </div>

          <LoadingButton loading={mutation.isPending} loadingText="Processing..." text="Send Reset Link"/>

        </form>
      </div>
      <h1 className="text-center pt-3 text-[#393E46]">
        Remebered it?{" "}
        <span className="text-DeepOrange">
          <Link to="/auth/login">Sign In</Link>
        </span>{" "}
      </h1>
    </div>
  );
}
