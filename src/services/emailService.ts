import { brevo, transactionalEmailsApi } from "../config/brevo";
import { env } from "../config/env";
import { ApiError } from "../utils/ApiError";

type SendEmailParams = {
  to: string;
  subject: string;
  html: string;
};

export const sendEmail = async ({ to, subject, html }: SendEmailParams): Promise<void> => {
  const emailRequest = new brevo.SendSmtpEmail();

  emailRequest.sender = {
    email: env.BREVO_SENDER_EMAIL,
    name: env.BREVO_SENDER_NAME
  };
  emailRequest.to = [{ email: to }];
  emailRequest.subject = subject;
  emailRequest.htmlContent = html;

  try {
    await transactionalEmailsApi.sendTransacEmail(emailRequest);
  } catch (error: unknown) {
    const statusCode =
      typeof error === "object" &&
      error !== null &&
      "response" in error &&
      typeof error.response === "object" &&
      error.response !== null &&
      "statusCode" in error.response &&
      typeof error.response.statusCode === "number"
        ? error.response.statusCode
        : undefined;

    const responseBody =
      typeof error === "object" && error !== null && "body" in error ? error.body : undefined;

    console.error("Brevo email sending failed", {
      statusCode,
      responseBody
    });

    if (statusCode === 401) {
      throw new ApiError(502, "Brevo API key is invalid or not recognized");
    }

    throw new ApiError(502, "Unable to send OTP email at the moment");
  }
};
