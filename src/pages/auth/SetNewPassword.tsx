import { validateResetPasswordSchema, type resetPasswordSchemaType } from "@/lib/schemaTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { resetPasswordApi } from "@/api/auth";
import { toast } from "react-toastify";
import axios from "axios";

export default function SetNewPassword() {
  const [revealPassword, setRevealPassword] = useState(false);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
const email = searchParams.get("email") || "";

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<resetPasswordSchemaType>({
  resolver: zodResolver(validateResetPasswordSchema),
});

  const togglePasswordReveal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setRevealPassword((prev) => !prev);
  };

  const mutation = useMutation({
    mutationFn: resetPasswordApi,
    onSuccess: (res) => {
      toast.success(res.data.message || "Password reset successful");
      navigate("/auth/login");
    },
    onError: (error) => {
      if (import.meta.env.DEV) {
        console.error(error);
      }
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data?.message || "Password reset failed");
      } else {
        toast.error("Something went wrong");
      }
    },
  });

  const onSubmitForm: SubmitHandler<resetPasswordSchemaType> = async (data) => {
  mutation.mutate({ ...data, email });
};

  return (
    <div className="container  mx-auto h-full flex flex-col justify-center max-w-md">
      <div className="mt-20 md:mt-24">
        <div className="">
          <h1 className="text-3xl  md:text-3xl lg:text-4xl font-bold">
            Reset Password
          </h1>{" "}
        </div>
        <form
          onSubmit={handleSubmit(onSubmitForm)}
          className="fieldset bg-base-200 border-base-300 rounded flex flex-col w-90 md:w-80 lg:w-110 justify-between gap-4  pt-4"
        >
          <div className="relative ">
            <p className="pb-1">
             New Password<span className="text-red-700">*</span>
            </p>
            <input
              type={revealPassword ? "text" : "password"}
              {...register("newPassword")}
              className="input border text-[#A1A1A1]  border-[#C3C9D3] w-full p-2 rounded-2xl  "
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={togglePasswordReveal}
              className="absolute  right-3  translate-y-3 text-gray-600 z-10"
            >
              {revealPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.newPassword && (
              <p className="text-red-500 text-sm">{errors?.newPassword.message}</p>
            )}
          </div>
          <div className="relative ">
            <p className="pb-1">
             Confirm Password<span className="text-red-700">*</span>
            </p>
            <input
              type={revealPassword ? "text" : "password"}
              {...register("confirmPassword")}
              className="input border text-[#A1A1A1]  border-[#C3C9D3] w-full p-2 rounded-2xl  "
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={togglePasswordReveal}
              className="absolute  right-3  translate-y-3 text-gray-600 z-10"
            >
              {revealPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors?.confirmPassword.message}</p>
            )}
          </div>

          <button
            className="btn btn-neutral w-full lg:w-110 bg-DeepOrange text-white mt-8 border rounded-3xl"
            type="submit"
          >
            <div className="flex justify-center items-center">
              <div>
                <h1 className="text-xl">
                  {mutation.isPending ? "Resetting..." : "Reset"}
                </h1>
              </div>
              <div>
                <img src="/stash_arrow-down-duotone.svg" alt="" />
              </div>
            </div>
          </button>
        </form>
      </div>
    </div>
  );
}