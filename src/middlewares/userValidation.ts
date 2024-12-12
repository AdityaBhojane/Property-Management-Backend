import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodSchema } from "zod";
import customErrorResponse from "../utils/customError";

export const validationRequest = (schema:ZodSchema) => (req:Request,res:Response,next:NextFunction)=>{
    try {
        schema.parse(req.body);
        next()
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json(customErrorResponse('something is wrong with zod validation', error))
    }
}