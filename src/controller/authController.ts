import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes";
import customErrorResponse from "../utils/customError";
import { userSignInService, userSignUpService, validateOtpService } from "../service/authService";
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
};

export const otpController = async (req:Request,res:Response)=>{
    try {
        const {email,otp} = req.body;
        const response = await validateOtpService(email,otp);
        res.status(StatusCodes.OK).json(customSuccessResponse('otp validated',response))
    } catch (error) {
        console.log("otp validation error", error);
        res.status(StatusCodes.BAD_REQUEST).json(customErrorResponse('something is wrong with otp controller',error))
    }
}