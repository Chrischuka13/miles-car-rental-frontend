import axiosClient from "@/lib/utils";
import { type DriverFormValues } from "@/lib/schemaTypes";

export const createDriverApi = async (data: DriverFormValues) => {
  const res = await axiosClient.post("/driver/create-driver", data, {
    withCredentials: true,
  });

  return res.data;
};

export const getAllDriversApi = async (page = 1) => {
  const res = await axiosClient.get("/driver/get-all-drivers", {
    params: {
      page,
      limit: 10,
    },
    withCredentials: true,
  });

  return res.data;
};

export const getSingleDriverApi = async (driverId: string) => {
  const res = await axiosClient.get(`/driver/${driverId}`, {
    withCredentials: true,
  });

  return res.data;
};
