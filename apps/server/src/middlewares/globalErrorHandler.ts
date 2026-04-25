import { ERROR_CODES, ErrorCode } from "@/constants/errorCode.js";
import AppError from "@/utils/AppError.js";
import { isJsonWebTokenError, isMongoDuplicateError, isTokenExpiredError } from "@/utils/typeGuards.js";
import  { Response, Request } from "express";
import { ZodError } from "zod";


export const globalErrorHandler = (
  err: unknown,
  req: Request,
  res: Response,
) => {
  let statusCode = 500;
  let message = "Internal Server Error"
  let code: ErrorCode = ERROR_CODES.INTERNAL_ERROR
  //custom error
  if (err instanceof AppError) {
    statusCode = err.statusCode
    message = err.message
    code = err.code
  }
  // Zod validation error
  else if (err instanceof ZodError) {
    statusCode = 400
    message = err.errors.map(e => e.message).join(", ")
  }
  // Mongoose Duplicate key
  else if (isMongoDuplicateError(err)) {
    statusCode = 409;
    message = "Duplicate field value"
    code = ERROR_CODES.DUPLICATE_RESOURCE
  }
  else if (isTokenExpiredError(err)) {
    statusCode = 401;
    message = "Token expired";
    code = ERROR_CODES.TOKEN_EXPIRED;
  }
  else if (isJsonWebTokenError(err)) {
    statusCode = 401;
    message = "Invalid Token";
    code = ERROR_CODES.INVALID_TOKEN
  }
  // Fallback
  if (err instanceof Error) {
    message = err.message
  }
  res.status(statusCode).json({
    success: false,
    code,
    message,
    ...(process.env.NODE_ENV === "development" && {
      stack: err instanceof Error ? err.stack : undefined
    })
  })
}