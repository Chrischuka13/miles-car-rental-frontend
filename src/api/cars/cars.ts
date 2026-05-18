import apiClient from "../client";

export const getAllCars = async (page = 1) => {
  const response = await apiClient.get(`/car/all?page=${page}&limit=9`);
  return response.data;
};

export const getCarBySlug = async (slug: string) => {
  const response = await apiClient.get(`/car/single/${slug}`);
  return response.data;
};

export const getTrendingCars = async () => {
  const response = await apiClient.get("/car/trending");
  return response.data;
};
