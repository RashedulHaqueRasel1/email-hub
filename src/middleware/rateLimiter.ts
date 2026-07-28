import rateLimit from "express-rate-limit";
import { StatusCodes } from "http-status-codes";

import { env } from "../config/env";

export const otpSendRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: env.OTP_MAX_ATTEMPTS_PER_WINDOW,
  standardHeaders: true,
  legacyHeaders: false,
  validate: {
    xForwardedForHeader: false
  },
  message: {
    success: false,
    message: "Too many OTP requests. Please try again later."
  },
  statusCode: StatusCodes.TOO_MANY_REQUESTS
});
