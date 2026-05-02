import { ErrorCode } from "@/constants/errorCode.js"

export type ApiSuccessResponse<T> = {
  success: true;
  data: T;
};

type Meta={
  total:number;
  page: number;
  limit: number;
  pages:number;
}
export type ApiPaginatedResponse<T>={
  success: true;
  data: T;
  meta: Meta;
}

export type ApiErrorResponse = {
  success: false;
  code: ErrorCode;
  message: string;
  stack?: string;
};