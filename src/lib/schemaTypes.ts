import { z } from "zod";

// export const validateBookingSchema = z
//   .object({
//     car: z.string({ message: "Car is required" }).min(1, "Car is required"),
//     pickupLocation: z
//       .string({ message: "Pickup location is required" })
//       .min(2, "Pickup location must be at least 2 characters")
//       .trim(),
//     returnLocation: z
//       .string({ message: "Return location is required" })
//       .min(2, "Return location must be at least 2 characters")
//       .trim(),

//     pickupDate: z
//       .string({ message: "Pickup date is required" })
//       .min(1, { message: "Pickup date is required" }),

//     pickupTime: z.string({ message: "Pickup time is required" }),
//     returnDate: z
//       .string({ message: "Return date is required" })
//       .min(1, { message: "Return date is required" }),

//     returnTime: z.string({ message: "Return time is required" }),

//     driverOption: z.boolean({
//       message: "Driver option must be a boolean",
//     }),
//   })
//   .refine((data) => new Date(data.returnDate) > new Date(data.pickupDate), {
//     message: "Return date must be after pickup date",
//     path: ["returnDate"],
//   });

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
        (val) => {
          // 1. Cleanly isolate just the YYYY-MM-DD part of the incoming value
          const inputDateString = new Date(val).toISOString().split("T")[0];

          // 2. Get today's calendar date string using your local timezone context
          const today = new Date();
          const year = today.getFullYear();
          const month = String(today.getMonth() + 1).padStart(2, "0");
          const day = String(today.getDate()).padStart(2, "0");
          const todayDateString = `${year}-${month}-${day}`;

          // 3. Directly compare strings lexicographically ("2026-05-19" >= "2026-05-19")
          return inputDateString >= todayDateString;
        },
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
      .min(1, "Pickup time is required"),

    returnTime: z
      .string({ message: "Return time is required" })
      .min(1, "Return time is required"),

    driverOption: z.boolean().default(false),
  })
  .refine((data) => new Date(data.returnDate) > new Date(data.pickupDate), {
    message: "Return date must be after pickup date",
    path: ["returnDate"],
  });

export type BookingForm = z.infer<typeof validateBookingSchema>;

export const validateCarBookingSchema1 = z.object({
  pickupDate: z.string({ message: "Pickup date is required" }).min(1, {
    message: "Pickup date is required",
  }),

  returnDate: z.string({ message: "Return date is required" }).min(1, {
    message: "Return date is required",
  }),
  pickupLocation: z
    .string({ message: "Pickup location is required" })
    .min(2, "Pickup location must be at least 2 characters")
    .trim(),
});

export type CarBookingFormData1 = z.infer<typeof validateCarBookingSchema1>;

// FIXED: Cleaned up the .merge() crash over refinements by destructuring the core shapes safely inside the body block
export const validateAdminNewBookingSchema = z
  .object({
    ...validateBookingSchema.shape,
    fullname: z.string().min(3, "Full name must be at least 3 characters long"),
    phone: z
      .string()
      .min(1, "Phone is required")
      .refine(
        (num) => num === "" || /^\+\d{10,15}$/.test(num),
        "Invalid phone number"
      ),
    email: z
      .string({ message: "Email address is required" })
      .email("Please enter a valid email address")
      .trim()
      .toLowerCase(),
    paymentMethod: z
      .string({ message: "Payment method is required" })
      .refine((val) => val === "Pay_with_Bank_Transfer", {
        message: "Admin bookings must use 'Pay_with_Bank_Transfer' only",
      }),
  })
  .refine((data) => new Date(data.returnDate) > new Date(data.pickupDate), {
    message: "Return date must be after pickup date",
    path: ["returnDate"],
  });

export type AdminCreateBookingSchemaType = z.infer<typeof validateAdminNewBookingSchema>;

export const validateSignUpSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { message: "First name is required" })
    .max(50, { message: "First name is too long" }),
  lastName: z
    .string()
    .trim()
    .min(1, { message: "Last name is required" })
    .max(50, { message: "Last name is too long" }),
  email: z.string().trim().lowercase().email({
    message: "Invalid email address",
  }),
  phone: z
    .string()
    .refine(
      (num) => num === "" || /^\+\d{10,15}$/.test(num),
      "Invalid phone number"
    ),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one upper case letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lower case letter",
    })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "Password must contain at least one special character",
    }),
});

export type signUpSchemaType = z.infer<typeof validateSignUpSchema>;

export const validateContactUsSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, { message: "Full name must be at least 2 characters" })
    .max(50, { message: "Full name is too long" }),
  email: z
    .string()
    .trim()
    .email({ message: "Invalid email address" })
    .lowercase(),
  phone: z
    .string()
    .refine((num) => /^\+\d{10,15}$/.test(num), "Invalid phone number"),
  subject: z
    .string()
    .trim()
    .min(5, { message: "Subject must be at least 5 characters" })
    .max(100, { message: "Subject is too long" }),
  message: z
    .string()
    .trim()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(1000, { message: "Message cannot exceed 1000 characters" }),
});

export type ContactUsSchemaType = z.infer<typeof validateContactUsSchema>;

export const validateLoginUser = z.object({
  email: z.string().trim().lowercase().email({
    message: "Invalid email address",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one upper case letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lower case letter",
    })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "Password must contain at least one special character",
    }),
});

export type loginSchemaType = z.infer<typeof validateLoginUser>;

export const validateForgotPasswordSchema = z.object({
  email: z.string().trim().toLowerCase().email({
    message: "Valid Email is required",
  }),
});

export type forgotPasswordSchemaType = z.infer<
  typeof validateForgotPasswordSchema
>;

export const validateVerifyOtpSchema = z.object({
  email: z.string().trim().toLowerCase().email({
    message: "Valid email is required",
  }),
  otp: z
    .string()
    .trim()
    .length(6, {
      message: "OTP must be exactly 6 digits",
    })
    .regex(/^\d{6}$/, {
      message: "OTP must contain only 6 digits",
    }),
});

export type verifyOtpSchemaType = z.infer<typeof validateVerifyOtpSchema>;

export const validateResetPasswordSchema = z.object({
  newPassword: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "Password must contain at least one special character",
    }),
  confirmPassword: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "Password must contain at least one special character",
    }),
});

export type resetPasswordSchemaType = z.infer<
  typeof validateResetPasswordSchema
>;

export const validateBookingSchema2 = z.object({
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

export type BookingFormData = z.infer<typeof validateBookingSchema2>;

export const paystackPaymentSchema = z.object({
  bookingId: z.string().min(1, {
    message: "Booking ID is required",
  }),
  carId: z.string().min(1, {
    message: "Car ID is required",
  }),
  amount: z.number().min(1, {
    message: "Amount is required",
  }),
  slug: z.string().min(1, {
    message: "Slug is required",
  }),
  paymentMethod: z.string().min(1, {
    message: "Payment method is required",
  }),
});

export type PaystackPaymentData = z.infer<typeof paystackPaymentSchema>;

export const validateDriverSchema = z.object({
  fullName: z.string().trim().min(3, {
    message: "Full name must be at least 3 characters long",
  }),

  phoneNumber: z.coerce
    .string()
    .trim()
    .min(1, {
      message: "Phone number is required",
    })
    .refine((num) => /^\+\d{10,15}$/.test(num), {
      message: "Invalid phone number",
    }),

  email: z
    .string({
      message: "Email address is required",
    })
    .trim()
    .toLowerCase()
    .email({
      message: "Please enter a valid email address",
    }),

  baseCity: z.string().trim().min(2, {
    message: "Base city is required",
  }),

  yearsOfExperience: z.coerce
    .number({
      message: "Years of experience must be a number",
    })
    .min(0, {
      message: "Years of experience cannot be negative",
    })
    .max(60, {
      message: "Invalid years of experience",
    }),

  languages: z
    .array(z.enum(["en", "yoruba", "igbo", "hausa", "fr", "pidgin"]))
    .min(1, { message: "select a language" }),

  licenseNumber: z.string().trim().min(3, {
    message: "License number is required",
  }),

  expiryDate: z
    .string({
      message: "Expiry date is required",
    })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Expiry date must be valid",
    })
    .refine((val) => new Date(val) > new Date(), {
      message: "License expiry date cannot be in the past",
    }),

  isVerified: z.boolean().default(false),

  status: z
    .enum(["available", "on-trip", "off-duty", "inactive"], {
      message: "select a driver status",
    })
    .default("available"),
  trips: z.coerce
    .number({
      message: "Trips must be a valid number",
    })
    .min(0, { message: "Trips cannot be negative" })
    .default(0),
});

export type DriverFormValues = z.infer<
  typeof validateDriverSchema
>;
