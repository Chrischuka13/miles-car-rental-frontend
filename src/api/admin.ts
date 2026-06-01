import axios from "axios";
import type { GetCustomersApiResponse } from "@/lib/constant";

export const getCustomersApi = async (
  searchParams: URLSearchParams,
): Promise<GetCustomersApiResponse> => {
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  // Look for "search" straight from the URL parameters
  const search = searchParams.get("search") || "";

  // const backendPage = Math.max(0, page - 1);

  const params = new URLSearchParams();
  params.append("page", String(page));
  params.append("limit", String(limit));
  params.append("query", search);

  const response = await axios.get<GetCustomersApiResponse>(
    `${import.meta.env.VITE_API_URL}/api/v1/admin/customers-dashboard?${params.toString()}`,
    {
      withCredentials: true,
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
    },
  );

  return response.data;
};
