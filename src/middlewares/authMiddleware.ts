import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { JWT_USER_SECRET } from "../configs/severConfig";

declare module "express-serve-static-core" {
    interface Request {
      user?: any; 
    }
  }

export const jwtVerify =(req:Request,res:Response,next:NextFunction):void=>{
    const token = req.headers['token'] as string;
    if(!token){
         res.status(StatusCodes.UNAUTHORIZED).json({
            message:"no token provided"
        })
    };
    try {
        const decoded = jwt.verify(token,JWT_USER_SECRET as string);
        req.user = decoded;
        next()
    } catch (error) {
         res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized: Invalid token" });  
    }
}