import { StatusCodes } from "http-status-codes";

import { createAndSendOtp, verifyOtpForEmail } from "../services/otpService";
import { asyncHandler } from "../utils/asyncHandler";
import { sendOtpSchema, verifyOtpSchema } from "../validators/authValidation";

export const sendOtp = asyncHandler(async (req, res) => {
  const { email } = sendOtpSchema.parse(req.body);

  await createAndSendOtp(email);

  res.status(StatusCodes.OK).json({
    success: true,
    message: "OTP sent successfully"
  });
});

export const verifyOtp = asyncHandler(async (req, res) => {
  const { email, otp } = verifyOtpSchema.parse(req.body);

  await verifyOtpForEmail(email, otp);

  res.status(StatusCodes.OK).json({
    success: true,
    message: "OTP verified successfully"
  });
});
