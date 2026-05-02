import { NextFunction, Request, Response } from "express";


type Handler = (req: Request, res: Response, next: NextFunction) => unknown | Promise<unknown>

export const catchHandler =
    (fn: Handler) => (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = fn(req, res, next);
            if (result instanceof Promise) {
                result.catch(next)
            }
        } catch (error) {
            next(error)
        }
    }