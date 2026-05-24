
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

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
  const response = await axios.post(`${BASE_URL}/api/v1/booking/create`, data);

  return response.data;
};



export interface BookingResponse {
  success: boolean;
  message: string;
  bookings: Booking[];
}

export interface Booking {
  _id: string;
  car: {
    _id: string;
    modelName: string;
   brand: string;
    images: {
      url: string;
    }[];
  };
  pickupLocation: string;
  returnLocation: string;
  pickupDate: string;
  returnDate: string;
  pickupTime: string;
  returnTime: string;
  totalPrice: number;
  totalDays: number;
  driverOption: boolean;
  paymentStatus: string;
  bookingStatus: string;
  createdAt: string;
}

export const getMyBookings = async () => {
  const response = await axios.get<BookingResponse>(
    `${BASE_URL}/api/v1/booking/my-bookings`,
  );
  return response.data;

}