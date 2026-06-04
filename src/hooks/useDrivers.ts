import { useQuery } from "@tanstack/react-query";
import { getAllDriversApi } from "../api/driver.api";

export const useDrivers = (page: number) => {
  return useQuery({
    queryKey: ["drivers", page],
    queryFn: () => getAllDriversApi(page),
    staleTime: 100 * 60 * 5,
  });
};