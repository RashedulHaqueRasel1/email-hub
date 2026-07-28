import { StatusCodes } from "http-status-codes";

import { env } from "../config/env";
import OTPVerification from "../models/OTPVerification";
import { ApiError } from "../utils/ApiError";
import { buildOtpEmailTemplate } from "../utils/emailTemplates";
import { generateOtp } from "../utils/generateOtp";
import { sendEmail } from "./emailService";

const getOtpExpiryDate = (): Date => {
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + env.OTP_EXPIRES_IN_MINUTES);
  return expiresAt;
};

export const createAndSendOtp = async (email: string): Promise<void> => {
  const otp = generateOtp();
  const expiresAt = getOtpExpiryDate();

  await OTPVerification.updateMany(
    { email, verified: false },
    {
      $set: {
        verified: true
      }
    }
  );

  const otpRecord = await OTPVerification.create({
    email,
    otp,
    expiresAt,
    verified: false
  });

  try {
    await sendEmail({
      to: email,
      subject: "Your verification OTP",
      html: buildOtpEmailTemplate(otp, env.OTP_EXPIRES_IN_MINUTES)
    });
  } catch (error) {
    await OTPVerification.findByIdAndDelete(otpRecord._id);
    throw error;
  }
};

export const verifyOtpForEmail = async (email: string, otp: string): Promise<void> => {
  const otpRecord = await OTPVerification.findOne({
    email,
    otp,
    verified: false
  }).sort({ createdAt: -1 });

  if (!otpRecord) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid OTP");
  }

  if (otpRecord.expiresAt.getTime() < Date.now()) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "OTP has expired");
  }

  otpRecord.verified = true;
  await otpRecord.save();
};
