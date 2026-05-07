import { z } from "zod";
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
    .refine(
      (num) => /^\+\d{10,15}$/.test(num),
      "Invalid phone number",
    ),
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
