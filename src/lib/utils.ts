import axios, { type CreateAxiosDefaults } from "axios";

const BASEURL = import.meta.env.VITE_BASE_URL || "";

const config: CreateAxiosDefaults = {
  baseURL: `${BASEURL}/api/v1`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
};

const axiosClient = axios.create(config);

export default axiosClient;