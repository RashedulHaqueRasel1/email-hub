import { z } from "zod";

export const sendOtpSchema = z.object({
  email: z.email("A valid email address is required").transform((value) => value.toLowerCase().trim())
});

export const verifyOtpSchema = z.object({
  email: z.email("A valid email address is required").transform((value) => value.toLowerCase().trim()),
  otp: z
    .string()
    .regex(/^\d{6}$/, "OTP must be a 6 digit number")
});
