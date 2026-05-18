import axiosClient from "@/lib/utils";

export const getAllCars = async (page = 1) => {
  const response = await axiosClient.get(`/car/all?page=${page}&limit=9`);
  return response.data;
};

export const getCarBySlug = async (slug: string) => {
  const response = await axiosClient.get(`/car/single/${slug}`);
  return response.data;
};

export const getTrendingCars = async () => {
  const response = await axiosClient.get("/car/trending");
  return response.data;
};
