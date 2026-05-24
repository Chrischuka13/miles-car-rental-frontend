import { validateLoginUser, type loginSchemaType } from "@/lib/schemaTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query"; 
import { loginUserApi } from "@/api/auth";
import { toast } from "react-toastify";
import axios from "axios";

export default function Login() {
  const [revealPassword, setRevealPassword] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient(); 
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<loginSchemaType>({
    resolver: zodResolver(validateLoginUser),
  });

  const togglePasswordReveal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setRevealPassword((prev) => !prev);
  };

  const mutation = useMutation({
    mutationFn: loginUserApi,
    onSuccess: async (res) => {
      toast.success(res.data.message || "Login Successful");
      const user = res.data.data;
      await queryClient.invalidateQueries({ queryKey: ["getMe"] });

      if (!user.emailVerified) {
        navigate("/auth/verify-Account");
      } else {
        navigate("/");
      }
    },
    onError: (error) => {
      if (import.meta.env.DEV) {
        console.error(error);
      }
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data?.message || "Login failed");
      } else {
        toast.error("Login failed");
      }
    },
  });

  const onSubmitForm: SubmitHandler<loginSchemaType> = async (data) => {
    mutation.mutate(data);
  };



  return (
    <div className="container mx-auto mt-10 h-full flex flex-col justify-center items-center max-w-lg md:mt-10">
      <div>
        <h1 className="text-4xl   text-center lg:text-start ">Welcome Back</h1>
        <p className="text-sm pt-2 text-[#393E46] text-center lg:text-start font-semibold">
          Enter your details to access your dashboard{" "}
        </p>
        <form
          onSubmit={handleSubmit(onSubmitForm)}
          className="fieldset bg-base-200 border-base-300 rounded flex flex-col w-90 md:w-120 lg:w-110 justify-between gap-4  pt-4"
        >
          <div>
            <p className="pb-1">
              Email Address<span className="text-red-700">*</span>
            </p>
            <input
              type="name"
              {...register("email")}
              className="input w-full text-[#A1A1A1]  border border-[#C3C9D3]  p-2 rounded-2xl"
              placeholder="you@example.com"
            />
          
            {errors.email && (
              <p className="text-red-500 text-sm">{errors?.email.message}</p>
            )}
          </div>
          <div className="relative ">
            <p className="pb-1">
              Password<span className="text-red-700">*</span>
            </p>
            <input
              type={revealPassword ? "text" : "password"}
              {...register("password")}
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
            {errors.password && (
              <p className="text-red-500 text-sm">{errors?.password.message}</p>
            )}
          </div>
          <Link to="/auth/forgot-Password" className="text-end text-[#F97316]">
            Forgot Password?
          </Link>

          <button
            className="btn btn-neutral bg-[#F97316] text-white mt-4 border p- rounded-3xl"
            type="submit"
          >
            <div className="flex justify-center items-center">
              <div>
                {" "}
                <h1 className="text-xl">
                  {mutation.isPending ? "Loading..." : "Login"}                                           
                </h1>
              </div>
              <div>
                <img src="/stasharrow.png" alt="" />
              </div>
            </div>
          </button>
          <div className="flex items-center ">
            <div className="flex-grow h-px bg-gray-200"></div>
            <span className="px-4 text-sm text-gray-400 font-medium">OR</span>
            <div className="flex-grow h-px bg-gray-200"></div>
          </div>

          {/* Google Button */}
          <button className="w-full py-3.5 flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-3xl text-gray-700 font-medium hover:bg-gray-50 transition-all shadow-sm">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>

          <h1 className="text-center text-[#393E46]">
            Don't have an account?{" "}
            <span className="text-[#F97316] ">
              <Link to="/auth/createAccount">SignUp</Link>
            </span>{" "}
          </h1>
        </form>
      </div>
    </div>
  );
}
