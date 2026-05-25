import { z } from "zod";

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
      "Invalid phone number",
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

export type forgotPasswordSchemaType = z.infer<typeof validateForgotPasswordSchema>;

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

export type resetPasswordSchemaType = z.infer<typeof validateResetPasswordSchema>;




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
      .refine((val) => !val || !isNaN(Date.parse(val)), {
        message: "Pickup date must be a valid date",
      })
      .refine(
        (val) => {
          if (!val) return true; 
          const inputDateString = new Date(val).toISOString().split("T")[0];
          const today = new Date();
          const todayDateString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
          return inputDateString >= todayDateString;
        },
        { message: "Pickup date cannot be in the past" }
      ),

    returnDate: z
      .string({ message: "Return date is required" })
      .refine((val) => !val || !isNaN(Date.parse(val)), {
        message: "Return date must be a valid date",
      }),

    pickupTime: z.string().optional(),
    returnTime: z.string().optional(),
    driverOption: z.boolean().default(false),
  })
  .refine(
    (data) => {
      if (!data.pickupDate || !data.returnDate) return true; 
      return new Date(data.returnDate) > new Date(data.pickupDate);
    },
    {
      message: "Return date must be after pickup date",
      path: ["returnDate"],
    }
  );

export const validateAdminNewBookingSchema = z
  .object({
    ...validateBookingSchema.shape,
    fullname: z.string().min(3, "Full name must be at least 3 characters long"),
    phone: z.string().min(1, "Phone number is required"),
    email: z
      .string({ message: "Email address is required" })
      .email("Please enter a valid email address")
      .trim()
      .toLowerCase(),
    paymentMethod: z.string({ message: "Payment method is required" }).min(1),
  })
  .refine(
    (data) => {
      if (!data.pickupDate || !data.returnDate) return true; 
      return new Date(data.returnDate) > new Date(data.pickupDate);
    },
    {
      message: "Return date must be after pickup date",
      path: ["returnDate"],
    }
  );

export type AdminCreateBookingSchemaType = z.infer<typeof validateAdminNewBookingSchema>;