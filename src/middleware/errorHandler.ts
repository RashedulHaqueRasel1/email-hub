import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";

import { env } from "../config/env";
import { ApiError } from "../utils/ApiError";

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (error instanceof ZodError) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Validation failed",
      errors: error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message
      }))
    });
    return;
  }

  if (error instanceof ApiError) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message
    });
    return;
  }

  console.error("Unhandled error", error);

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message:
      env.NODE_ENV === "production"
        ? "Something went wrong"
        : "Internal server error"
  });
};
