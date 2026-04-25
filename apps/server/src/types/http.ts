import {Request,Response} from 'express';

export type TypeRequest<
TBody=Record<string, unknown>,
TParams=Record<string, string>,
TQuery=Record<string, string>
> = Request<TParams,unknown,TBody,TQuery>

export type TypedResponse<TRes> = Response<TRes>;