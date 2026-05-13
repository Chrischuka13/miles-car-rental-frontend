import { z } from "zod";

export const validateBookingSchema = z.object({
  pickupDate: z.string().min(1, {
    message: "Pickup date is required",
  }),

  returnDate: z.string().min(1, {
    message: "Return date is required",
  }),

  pickupAddress: z.string().min(5, {
    message: "Pickup address must be at least 5 characters long",
  }),
});
    
export type BookingFormData = z.infer<typeof validateBookingSchema>;