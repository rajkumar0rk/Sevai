import { ERROR_CODES } from "@/constants/errorCode.js";
import { ApiErrorResponse, ApiPaginatedResponse, ApiSuccessResponse } from "@/types/api.js";
import { RequestHandler,Response } from "express";

type ErrorInput = string | Omit<ApiErrorResponse, "success">;


export const responseHandler: RequestHandler = (_req, res, next) => {
    res.success = function <T>(this: Response, data: T, statusCode = 200) {
        const response:ApiSuccessResponse<T> = {
            success: true,
            data,
        };
        return this.status(statusCode).json(response);
    };

    res.paginated = function<T>(this: Response, data:T,options:{total:number,page:number,limit:number,statusCode:number}){
        const {total,page,limit,statusCode=200}=options
        const response:ApiPaginatedResponse<T>={
            success:true,
            data,
            meta:{total,page,limit,pages:limit > 0 ? Math.ceil(total/limit):0}
        }
        return this.status(statusCode).json(response)
    }


    res.error = function (
        this: Response,
        error: ErrorInput,
        statusCode = 500
    ) {
        const isStringError = typeof error === "string";
        let response: ApiErrorResponse={
            success: false,
            code: isStringError?ERROR_CODES.INTERNAL_ERROR:error.code,
            message:isStringError? error:error.message,
            ...(process.env.NODE_ENV === "development" &&
            !isStringError &&
            error.stack && { stack: error.stack }),
        };

        return this.status(statusCode).json(response);
    };

    next();
};