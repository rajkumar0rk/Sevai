import { ERROR_CODES } from '@/constants/errorCode.js';
import AppError from '@/utils/AppError.js';
import rateLimit from 'express-rate-limit';

export const authLimiter= rateLimit({
    windowMs:15*60*1000,
    max:10,
    standardHeaders:true,
    legacyHeaders:false,
    handler:(_req,_res,next)=>next(new AppError("Too many attempts, please try again later",429,ERROR_CODES.FORBIDDEN))
})

export const globalLimiter= rateLimit({
    windowMs:60*1000,
    max:200
})