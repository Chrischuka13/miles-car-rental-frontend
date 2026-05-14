
import axios from "axios";

const BASE_URL = import.meta.env.VITE_MILES_CAR_RENTAL_URL;

export type CreateBookingPayload = {
  car: string;
  pickupLocation: string;
  returnLocation: string;
  pickupDate: string;
  returnDate: string;
  pickupTime: string;
  returnTime: string;
  driverOption: boolean;
};

export const createBooking = async (data: CreateBookingPayload) => {
  const response = await axios.post(
    `${BASE_URL}/api/v1/booking/create`,
    data
  );

  return response.data;
};