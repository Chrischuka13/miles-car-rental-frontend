import axios from "axios";

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




export const getAdminDashboardStatsApi = async (filter: string = "30d") => {
  return await axios.get(
    `${import.meta.env.VITE_API_URL}/api/v1/admin/dashboard-stats?period=${filter}`,
    { withCredentials: true }
  );
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