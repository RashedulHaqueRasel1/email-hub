import { InferSchemaType, Model, Schema, model } from "mongoose";

const otpVerificationSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true
    },
    otp: {
      type: String,
      required: true
    },
    expiresAt: {
      type: Date,
      required: true
    },
    verified: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

otpVerificationSchema.index({ email: 1, otp: 1, verified: 1 });
otpVerificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export type OTPVerificationDocument = InferSchemaType<typeof otpVerificationSchema>;
export type OTPVerificationModel = Model<OTPVerificationDocument>;

const OTPVerification = model<OTPVerificationDocument, OTPVerificationModel>(
  "OTPVerification",
  otpVerificationSchema
);

export default OTPVerification;
