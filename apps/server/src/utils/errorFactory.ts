import { ERROR_CODES } from "@/constants/errorCode.js";
import AppError from "./AppError.js";

export const Errors={
  notFound:(msg="Resource not found")=>
    new AppError(msg,404,ERROR_CODES.NOT_FOUND),
  unauthorized:(msg="Unauthorized")=>
    new AppError(msg,401,ERROR_CODES.UNAUTHORIZED),
  forbidden:(msg="Forbidden")=>
    new AppError(msg,403,ERROR_CODES.FORBIDDEN),
  validation:(msg="Validation failed")=>
    new AppError(msg,400,ERROR_CODES.VALIDATION_ERROR),
  conflict:(msg="Duplicate resource")=>
    new AppError(msg,409,ERROR_CODES.DUPLICATE_RESOURCE)
}