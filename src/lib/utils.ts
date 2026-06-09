import axios, { type CreateAxiosDefaults } from "axios";
import { clsx, type ClassValue } from "clsx";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";

const BASEURL = import.meta.env.VITE_API_URL || "/api/v1";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const config: CreateAxiosDefaults = {
  baseURL: BASEURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
};

const axiosClient = axios.create(config);

export default axiosClient;

export const errorHandler = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    toast.error(errorMessage);
    return errorMessage;
  }
};

export const bookingStatusColors = {
  Upcoming: "bg-[#F9731626] text-[#F97316] border-[#F97316]",
  Completed: "bg-[#16A34A26] text-[#16A34A] border-[#16A34A26]   ",
  Cancelled: "bg-[#DC262626] text-[#DC2626] border-[#DC262626]  ",
  Pending: "bg-yellow-100 text-yellow-700   border-bg-yellow-100   ",
  Confirmed: "bg-blue-100 text-blue-700   border-bg-green-100   ",
};
