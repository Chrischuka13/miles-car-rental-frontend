import axios from "axios";

export const getAllCars = async (page = 1) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/v1/car/all?page=${page}&limit=9`,
  );
  return response.data;
};

export const getCarBySlug = async (slug: string) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/v1/car/single/${slug}`,
  );
  return response.data;
};

export const getTrendingCars = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/v1/car/trending`,
  );
  return response.data;
};
