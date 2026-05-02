import { JwtPayload } from "jsonwebtoken";
import {ApiErrorResponse} from '@/types/api.ts'

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload & {
        userId: string;
        role: string;
      };
    }
    interface Response {
    success<T>(data: T,statusCode?:number): this;
    paginated<T>(data: T,options:{statusCode?:number,total:number,page:number,limit:number}): this;
    error(error: string | Omit<ApiErrorResponse,"success">, statusCode?:number): this;
  }
  }
}