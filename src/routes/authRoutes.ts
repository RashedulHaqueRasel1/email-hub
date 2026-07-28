import { Router } from "express";

import { sendOtp, verifyOtp } from "../controllers/authController";
import { otpSendRateLimiter } from "../middleware/rateLimiter";

const router = Router();

router.post("/send-otp", otpSendRateLimiter, sendOtp);
router.post("/verify-otp", verifyOtp);

export default router;
