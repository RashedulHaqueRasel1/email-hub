export const buildOtpEmailTemplate = (otp: string, expiresInMinutes: number): string => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1f2937;">
      <h2 style="color: #111827;">Your One-Time Password</h2>
      <p>Use the OTP below to continue your verification process:</p>
      <div style="font-size: 32px; font-weight: bold; letter-spacing: 6px; margin: 24px 0; color: #0f766e;">
        ${otp}
      </div>
      <p>This OTP will expire in ${expiresInMinutes} minutes.</p>
      <p>If you did not request this email, you can safely ignore it.</p>
    </div>
  `;
};
