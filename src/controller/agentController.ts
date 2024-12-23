import { StatusCodes } from "http-status-codes";
import { getAgentService } from "../service/userService"
import customErrorResponse from "../utils/customError";
import { Request, Response } from "express";
import customSuccessResponse from "../utils/customSuccess";


export const getAgentController = async(req:Request,res:Response)=>{
    try {
        const response = await getAgentService();
        res.status(StatusCodes.OK).json(customSuccessResponse('agents fetched successfully',response))
    } catch (error) {
        console.log('error in get agent controller', error)
        res.status(StatusCodes.BAD_REQUEST).json(customErrorResponse('all fields are required', StatusCodes.BAD_REQUEST))
    }
}