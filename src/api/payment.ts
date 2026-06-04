import type { PaystackPaymentData } from "@/lib/schemaTypes";
import axiosClient from "@/lib/utils";

export const initiatePayment = async (payload: PaystackPaymentData) => {
  try {
    const response = await axiosClient.post("/payment/initialize", payload, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error initiating payment:", error);
    throw error;
  }
};

export const verifyPayment = async (reference: string) => {
  try {
    const response = await axiosClient.get(
      `/payment/verify?reference=${reference}`,
      {
        withCredentials: true,
      },
    );
    return response;
  } catch (error) {
    console.error("Error initiating payment:", error);
    throw error;
  }
};
