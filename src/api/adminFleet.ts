import axios from "axios";

export const getAdminFleetCars = async (page = 1) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/v1/admin/fleet-dashboard?page=${page}&limit=9`,
    {
      withCredentials: true,
    },
  );

  return {
    ...response.data,
    pagination: response.data.body?.pagination || response.data.pagination,
  };
};
