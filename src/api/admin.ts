import axios from "axios";
import type { GetCustomersApiResponse } from "@/lib/constant";

export const getCustomersApi = async (
  searchParams: URLSearchParams,
): Promise<GetCustomersApiResponse> => {
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const search = searchParams.get("search") || "";

  const params = new URLSearchParams();
  params.append("page", String(page));
  params.append("limit", String(limit));
  params.append("query", search); // Bound specifically to backend 'query' expectancies

  const response = await axios.get<GetCustomersApiResponse>(
    `${import.meta.env.VITE_API_URL}/api/v1/admin/customers-dashboard?${params.toString()}`,
    {
      withCredentials: true,
    },
  );

  return response.data;
};