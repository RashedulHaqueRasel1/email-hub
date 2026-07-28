# EmailHub OTP Email API Service

Production-ready OTP email sending API built with Node.js, Express.js, TypeScript, pnpm, MongoDB, Mongoose, Zod, and Brevo Transactional Email API.

## Folder Structure

```text
.
├── .env.example
├── .gitignore
├── package.json
├── README.md
├── tsconfig.json
└── src
    ├── app.ts
    ├── server.ts
    ├── config
    │   ├── brevo.ts
    │   ├── database.ts
    │   └── env.ts
    ├── controllers
    │   └── authController.ts
    ├── middleware
    │   ├── errorHandler.ts
    │   ├── notFoundHandler.ts
    │   └── rateLimiter.ts
    ├── models
    │   └── OTPVerification.ts
    ├── routes
    │   └── authRoutes.ts
    ├── services
    │   ├── emailService.ts
    │   └── otpService.ts
    ├── types
    │   └── express
    │       └── index.d.ts
    ├── utils
    │   ├── ApiError.ts
    │   ├── asyncHandler.ts
    │   ├── emailTemplates.ts
    │   └── generateOtp.ts
    └── validators
        └── authValidation.ts
```

## Features

- `POST /api/v1/auth/send-otp` to generate and send a 6-digit OTP
- `POST /api/v1/auth/verify-otp` to validate the OTP
- OTP expiry after 5 minutes
- MongoDB persistence with automatic TTL cleanup
- Brevo Transactional Email API integration
- Request validation with Zod
- Rate limiting for OTP send requests
- Centralized error handling
- Production-safe error messages

## Tech Stack

- Node.js
- Express.js
- TypeScript
- pnpm
- MongoDB + Mongoose
- Brevo Transactional Email API
- dotenv
- Zod

## Installation

1. Install dependencies:

```bash
pnpm install
```

2. Copy the example environment file:

```bash
cp .env.example .env
```

3. Update `.env` with your real values.

4. Start development server:

```bash
pnpm dev
```

## Production Commands

```bash
pnpm build
pnpm start
```

## Environment Variables

Create a `.env` file in the project root:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/emailhub-otp-service
BREVO_API_KEY=your_brevo_api_key_here
BREVO_SENDER_EMAIL=no-reply@example.com
BREVO_SENDER_NAME=EmailHub
CLIENT_ORIGIN=*
OTP_EXPIRES_IN_MINUTES=5
OTP_MAX_ATTEMPTS_PER_WINDOW=5
```

## Where To Put The Brevo API Key

Put your Brevo API key in the root `.env` file:

```env
BREVO_API_KEY=your_actual_brevo_api_key
```

The code reads it from `src/config/env.ts` and uses it in `src/config/brevo.ts`.

## How To Get Brevo API Key

1. Log in to your Brevo account.
2. Open SMTP & API or API Keys from your Brevo dashboard.
3. Create or copy your transactional API key.
4. Paste it into `.env` as `BREVO_API_KEY`.

You also need to configure:

- `BREVO_SENDER_EMAIL`: a verified sender email in Brevo
- `BREVO_SENDER_NAME`: the display name for outgoing OTP emails

## API Endpoints

### Health Check

```http
GET /health
```

Response:

```json
{
  "success": true,
  "message": "OTP Email API is running"
}
```

### Send OTP

```http
POST /api/v1/auth/send-otp
Content-Type: application/json
```

Request body:

```json
{
  "email": "user@gmail.com"
}
```

Success response:

```json
{
  "success": true,
  "message": "OTP sent successfully"
}
```

### Verify OTP

```http
POST /api/v1/auth/verify-otp
Content-Type: application/json
```

Request body:

```json
{
  "email": "user@gmail.com",
  "otp": "123456"
}
```

Success response:

```json
{
  "success": true,
  "message": "OTP verified successfully"
}
```

## Example cURL Requests

Send OTP:

```bash
curl -X POST http://localhost:5000/api/v1/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{"email":"user@gmail.com"}'
```

Verify OTP:

```bash
curl -X POST http://localhost:5000/api/v1/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"email":"user@gmail.com","otp":"123456"}'
```

## Security Notes

- OTP is never returned in API responses
- Expired OTP records are automatically removed by MongoDB TTL index
- Old unverified OTPs are invalidated before a new one is created
- Rate limiting is applied on OTP send requests
- Validation errors are sanitized and structured
- Internal failures return safe messages

## Notes

- MongoDB must be running before starting the API
- Use a verified Brevo sender email to avoid transactional email failures
- If you want JWT later, you can add it around these endpoints depending on your client app flow

## Render Deployment

Use Render `Web Service` with:

```bash
Build Command: pnpm install && pnpm build
Start Command: pnpm start
```

Set these Render environment variables:

```env
NODE_ENV=production
PORT=10000
MONGODB_URI=your_mongodb_connection_string
BREVO_API_KEY=your_brevo_api_key
BREVO_SENDER_EMAIL=your_verified_sender_email
BREVO_SENDER_NAME=EmailHub
CLIENT_ORIGIN=https://your-frontend-domain.com
OTP_EXPIRES_IN_MINUTES=5
OTP_MAX_ATTEMPTS_PER_WINDOW=5
```

Render health check URL:

```text
/
```
