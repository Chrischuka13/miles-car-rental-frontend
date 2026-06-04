import axios from "axios";
import { type DriverFormValues } from "@/lib/schemaTypes";

export const createDriverApi = async (data: DriverFormValues) => {
  const res = await axios.post("/api/v1/driver/create-driver", data, {
    withCredentials: true,
  });

  return res.data;
};

export const getAllDriversApi = async (page = 1) => {
  const res = await axios.get("/api/v1/driver/get-all-drivers", {
    params: {
      page,
      limit: 10,
    },
    withCredentials: true,
  });

  return res.data;
};

export const getSingleDriverApi = async (driverId: string) => {
  const res = await axios.get(`/api/v1/driver/${driverId}`, {
    withCredentials: true,
  });

  return res.data;
};
