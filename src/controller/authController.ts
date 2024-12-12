import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes";
import customErrorResponse from "../utils/customError";
import { userSignInService, userSignUpService } from "../service/userService";
import customSuccessResponse from "../utils/customSuccess";


export const signUpController = async(req:Request,res:Response)=>{
    try {
        const {username,email,password} = req.body;
        const response = await userSignUpService({username,email,password});
        res.status(StatusCodes.OK).json(customSuccessResponse('user created successfully',response))
    } catch (error) {
        console.log("sign up controller error", error);
        res.status(StatusCodes.BAD_REQUEST).json(customErrorResponse('something is wrong with sign up controller',error))
    }
}

export const signInController = async(req:Request,res:Response)=>{
    try {
        const {email,password} = req.body;
        const response = await userSignInService({email,password});
        res.status(StatusCodes.OK).json(customSuccessResponse('user singed in successfully',response))
    } catch (error) {
        console.log("sign up controller error", error);
        res.status(StatusCodes.BAD_REQUEST).json(customErrorResponse('something is wrong with sign in controller',error))
    }
}