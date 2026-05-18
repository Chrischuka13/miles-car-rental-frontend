import { validateForgotPasswordSchema, type forgotPasswordSchemaType } from "@/lib/schemaTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { forgotPasswordApi } from "@/api/auth";
import { toast } from "react-toastify";
import axios from "axios";

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
    <div className="container  mx-auto h-full flex flex-col justify-center max-w-md">
      <div className="">
        <div className="flex gap-1 mt-10 text-[#4B5563] pb-8 ">
          <Link to="/auth/login">
            <ArrowLeft />
          </Link>
          <p>Back to sign in</p>
        </div>
        <h1 className="text-4xl md:text-3xl lg:text-4xl">Forgot password?</h1>
        <p className="text-sm pt-4 text-[#393E46]">
          Enter the email associated with your account we'll send you a link to
          reset your password{" "}
        </p>
        <form
          onSubmit={handleSubmit(onSubmitForm)}
          className="fieldset bg-base-200 border-base-300 rounded flex flex-col w-full lg:w-110 justify-between gap-4  pt-4 md:"
        >
          <div>
            <p className="pb-1">
              Email Address<span className="text-red-700">*</span>
            </p>
            <input
              type="email"
              {...register("email")}
              className="input w-full text-[#A1A1A1]  border border-[#C3C9D3]  p-2 rounded-2xl"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors?.email.message}</p>
            )}
          </div>
          <button
            className="btn btn-neutral w-full lg:w-110 bg-[#F97316] text-white mt-8 border rounded-3xl"
            type="submit"
          >
            <div className="flex justify-center items-center">
              <div>
                <h1 className="text-xl">
                  {mutation.isPending ? "Sending..." : "Send Reset Link"}
                </h1>
              </div>
              <div>
                <img src="/stash_arrow-down-duotone.png" alt="" />
              </div>
            </div>
          </button>
        </form>
      </div>
      <h1 className="text-center  pt-3 text-[#393E46]">
        Remebered it?{" "}
        <span className="text-[#F97316] ">
          <Link to="/auth/login">Sign In</Link>
        </span>{" "}
      </h1>
    </div>
  );
}
