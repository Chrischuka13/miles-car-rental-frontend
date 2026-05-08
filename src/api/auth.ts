import axios from "axios";
import { cache } from "react";

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  email: string;
  newPassword: string;
  confirmPassword: string;
}
export interface VerifyOtpPayload {
  otp: string;
  email: string;
}

export const registerUserApi = async (formData: RegisterPayload) => {
  return await axios.post(
    `${import.meta.env.VITE_API_URL}/api/v1/user/register`,
    formData,
    {
      withCredentials: true,
    },
  );
};

export const loginUserApi = async (formData: LoginPayload) => {
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/v1/user/login`,
    formData,
    {
      withCredentials: true,
    },
  );
  return res;
};

export const forgotPasswordApi = async (formData: ForgotPasswordPayload) => {
  return await axios.post(
    `${import.meta.env.VITE_API_URL}/api/v1/user/forgot-password`,
    formData,
    {
      withCredentials: true,
    },
  );
};

export const verifyForgotPasswordOtpApi = async (
  formData: VerifyOtpPayload,
) => {
  return await axios.post(
    `${import.meta.env.VITE_API_URL}/api/v1/user/verify-otp?email=${formData.email}`,
    { otp: formData.otp },
    {
      withCredentials: true,
    },
  );
};

export const resetPasswordApi = async (formData: ResetPasswordPayload) => {
  return await axios.post(
    `${import.meta.env.VITE_API_URL}/api/v1/user/reset-password?email=${formData.email}`,
    {
      newPassword: formData.newPassword,
      confirmPassword: formData.confirmPassword,
    },
    {
      withCredentials: true,
    },
  );
};

export const verifyOtpApi = async (formData: VerifyOtpPayload) => {
  return await axios.post(
    `${import.meta.env.VITE_API_URL}/api/v1/user/verify-account?email=${formData.email}`,
    { otp: formData.otp },
    {
      withCredentials: true,
    },
  );
};

export const resendOtpApi = async (formData: { email: string }) => {
  return await axios.post(
    `${import.meta.env.VITE_API_URL}/api/v1/user/resend-otp`,
    formData,
    {
      withCredentials: true,
    },
  );
};
export const resendVerifyOtpApi = async (formData: { email: string }) => {
  return await axios.post(
    `${import.meta.env.VITE_API_URL}/api/v1/user/resend-verifyaccount-otp`,
    formData,
    {
      withCredentials: true,
    },
  );
};


export const getMeApi = cache(async () => {
  return await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/user/me`, {
    withCredentials: true,
  });
});

export const logoutApi = async (email: string) => {
  return await axios.post(
    `${import.meta.env.VITE_API_URL}/api/v1/user/logout`,
    { email },
    {
      withCredentials: true,
    },
  );
};
