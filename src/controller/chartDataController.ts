import { StatusCodes } from "http-status-codes";
import { chartDataService } from "../service/chartsDataService"
import customErrorResponse from "../utils/customError";
import { Request, Response } from "express";
import customSuccessResponse from "../utils/customSuccess";


 export const chatDataController = async(req:Request, res:Response)=>{
    try {
        const stats = await chartDataService();
        if(!stats) res.status(StatusCodes.BAD_REQUEST).json(customErrorResponse('something is wrong to fetch data', StatusCodes.BAD_REQUEST));
         res.status(StatusCodes.OK).json(customSuccessResponse('data fetched successfully', stats))
    } catch (error) {
        console.log("something is wrong with chart data controller =", error);
        res.status(StatusCodes.BAD_REQUEST).json(customErrorResponse('something is wrong with charts data controller',error))
    }
}