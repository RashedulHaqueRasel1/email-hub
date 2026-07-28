import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import { env } from "./config/env";
import { notFoundHandler } from "./middleware/notFoundHandler";
import { errorHandler } from "./middleware/errorHandler";
import authRoutes from "./routes/authRoutes";

const app = express();

app.set("trust proxy", 1);

app.use(helmet());
app.use(
  cors({
    origin: env.CLIENT_ORIGIN === "*" ? true : env.CLIENT_ORIGIN.split(",").map((origin) => origin.trim()),
    credentials: true
  })
);
app.use(express.json({ limit: "10kb" }));
app.use(morgan("combined"));

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "EmailHub OTP API is live"
  });
});

app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "OTP Email API is running"
  });
});

app.use("/api/v1/auth", authRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
