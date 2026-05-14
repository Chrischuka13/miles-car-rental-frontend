import axios, { type CreateAxiosDefaults } from "axios";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

const BASEURL = import.meta.env.VITE_BASE_URL || "";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


const config: CreateAxiosDefaults = {
  baseURL: `${BASEURL}/api/v1`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
};

const axiosClient = axios.create(config);

export default axiosClient;