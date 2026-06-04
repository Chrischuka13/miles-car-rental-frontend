import axios from "axios";

type SettingsForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password?: string;
};

export const getAdminBookingsApi = async (page = 1) => {
  return await axios.get(
    `${import.meta.env.VITE_API_URL}/api/v1/admin/get_bookings`,
    {
      params: { page, limit: 10 },
      withCredentials: true,
    }
  );
};

export const getAdminSingleBookingApi = async (bookingId: string) => {
  return await axios.get(
    `${import.meta.env.VITE_API_URL}/api/v1/admin/single_booking/${bookingId}`,
    {
      withCredentials: true,
    }
  );
};

export const markBookingAsCompletedApi = async (id: string) => {
  return await axios.post(
    `${import.meta.env.VITE_API_URL}/api/v1/admin/mark_booking_as_completed/${id}`,
    {}, // Empty body as required by route pattern
    {
      withCredentials: true,
    }
  );
};


export const cancelAdminBookingApi = async (id: string) => {
  return await axios.post(
    `${import.meta.env.VITE_API_URL}/api/v1/admin/cancel-booking/${id}`,
    {}, // Empty body configuration payload as per API specifications
    {
      withCredentials: true,
    }
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const adminCreateBookingApi = async (data: any) => {
  return await axios.post(
    `${import.meta.env.VITE_API_URL}/api/v1/admin/admin_create_booking`,
    data,
    { withCredentials: true }
  );
};




export const getAdminDashboardStatsApi = async (range: string) => {
   return await axios.get("/api/v1/admin/dashboard-stats", {
    params: { range }
     // This appends ?range=7d to your backend request endpoint
  });
};


export const getAdminCarsApi = async () => {
  return await axios.get(
    `${import.meta.env.VITE_API_URL}/api/v1/car/all`, 
    { withCredentials: true }
  );
};

export const getAdminDriversApi = async () => {
  return await axios.get(
    `${import.meta.env.VITE_API_URL}/api/v1/driver/get-all-drivers`,
    { withCredentials: true }
  );
};

export const assignDriverApi = async (data: { bookingId: string; driverId: string }) => {
  return await axios.post(
    `${import.meta.env.VITE_API_URL}/api/v1/driver/assign-driver`,
    data,
    { withCredentials: true }
  );
};

export const updateAdminSettingsApi = async (formData: SettingsForm) => {
  return await axios.patch(
    `${import.meta.env.VITE_API_URL}/api/v1/admin/update-admin`,
    formData,
    {
      withCredentials: true,
    },
  );
}

export const deleteWorkspaceApi = async () => {
  return await axios.delete(
    `${import.meta.env.VITE_API_URL}/api/v1/admin/delete-workspace`,
    {
      withCredentials: true,
    },
  );
};

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