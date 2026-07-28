import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(5000),
  MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),
  BREVO_API_KEY: z.string().min(1, "BREVO_API_KEY is required"),
  BREVO_SENDER_EMAIL: z.email("BREVO_SENDER_EMAIL must be a valid email address"),
  BREVO_SENDER_NAME: z.string().min(1, "BREVO_SENDER_NAME is required"),
  CLIENT_ORIGIN: z.string().default("*"),
  OTP_EXPIRES_IN_MINUTES: z.coerce.number().int().positive().default(5),
  OTP_MAX_ATTEMPTS_PER_WINDOW: z.coerce.number().int().positive().default(5)
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid environment variables", parsedEnv.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsedEnv.data;
