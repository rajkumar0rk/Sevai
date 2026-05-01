import { ErrorCode } from "@/constants/errorCode.js";

class AppError extends Error{

  statusCode:number;
  code:ErrorCode;
  isOperational: boolean;
  constructor(message:string,statusCode:number,code:ErrorCode){
    super(message)
    this.statusCode=statusCode;
    this.code=code;
    this.isOperational=true;

    Error.captureStackTrace(this,this.constructor)
  }
}

export default AppError