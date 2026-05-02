import { Request,Response,NextFunction } from "express";
import { ZodError, ZodSchema } from "zod";

type validationSchema={
    body?:ZodSchema;
    query?:ZodSchema;
    params?:ZodSchema;
}

export const validate=(schemas:validationSchema)=>(req:Request,res:Response,next:NextFunction)=>{
    try {
        if(schemas.body){
            req.body=schemas.body.parse(req.body)
        }
        if(schemas.query){
            req.query=schemas.query.parse(req.query);
        }
        if(schemas.params){
            req.params=schemas.params.parse(req.params)
        }
        next()
    } catch (err) {
       next(err)
    }
}