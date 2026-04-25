import { ErrorCode } from "@/constants/errorCode.js"

export type ApiErrorResponse={
  success:false,
  code:ErrorCode,
  message:string
}

export type ApiSuccessResponse<T> ={
  success:true,
  data:T
}