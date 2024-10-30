import { z } from "zod";

export const checkoutSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email(),
  phoneNumber: z.string().min(10).max(15),
  streetAddress: z.string().min(5).max(50),
  zipCode: z.string().min(5).max(10),
  city: z.string().min(2).max(50),
  country: z.string().min(2).max(50),
});

export type TCheckout = z.infer<typeof checkoutSchema>;
