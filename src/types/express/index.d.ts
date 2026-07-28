import "express";
import { ZodTypeAny } from "zod";

declare global {
  namespace Express {
    interface Request {
      validatedBody?: ZodTypeAny["_output"];
    }
  }
}

export {};
