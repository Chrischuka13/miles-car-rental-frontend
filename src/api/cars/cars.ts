import axiosClient from "@/lib/utils";

export const getAllCars = async () => {
  const response = await axiosClient.get("/car/all");

  // We safely build the full URL for debugging
  // const fullURL = `${response.config.baseURL ?? ""}${response.config.url ?? ""}`;

  // // Look for this in your browser console!
  // console.log("ACTUAL TARGET URL:", fullURL);
  // console.log("RESPONSE DATA:", response.data);

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
