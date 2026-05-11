import { z } from "zod";

export const validateBookingSchema = z
  .object({
    car: z.string({ message: "Car is required" }).min(1, "Car is required"),

    pickupLocation: z
      .string({ message: "Pickup location is required" })
      .min(2, "Pickup location must be at least 2 characters")
      .trim(),

    returnLocation: z
      .string({ message: "Return location is required" })
      .min(2, "Return location must be at least 2 characters")
      .trim(),

    pickupDate: z
      .string({ message: "Pickup date is required" })
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Pickup date must be a valid date",
      })
      .refine(
        (val) => new Date(val) >= new Date(new Date().setHours(0, 0, 0, 0)),
        {
          message: "Pickup date cannot be in the past",
        }
      ),

    returnDate: z
      .string({ message: "Return date is required" })
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Return date must be a valid date",
      }),

    pickupTime: z
      .string({ message: "Pickup time is required" })
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: "Time must be in HH:MM (24-hour format)",
      }),

    returnTime: z
      .string({ message: "Return time is required" })
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: "Time must be in HH:MM (24-hour format)",
      }),

    driverOption: z.boolean(),
  })
  .refine((data) => new Date(data.returnDate) > new Date(data.pickupDate), {
    message: "Return date must be after pickup date",
    path: ["returnDate"],
  });

export type BookingForm = z.infer<typeof validateBookingSchema>;
