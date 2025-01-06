import { Request, Response } from "express";
import { CreateChatService, findAdminChatByIdService, findChatByIdService } from "../service/chatService"
import customErrorResponse from "../utils/customError";
import { StatusCodes } from "http-status-codes";
import customSuccessResponse from "../utils/customSuccess";


export const createChatController = async (req:Request,res:Response) => {
    try {
        const userId = req.user.id;
        const {participantId} = req.body;
        const response = await CreateChatService(userId, participantId);
        res.status(StatusCodes.OK).json(customSuccessResponse('chat created successfully',response))
    } catch (error) {
        console.log("create chat controller error -", error);
        res.status(StatusCodes.BAD_REQUEST).json(customErrorResponse('something is wrong with create property controller', error))
    }
}

export const findChatByIdController = async (req:Request,res:Response) => {
    try {
        const userId = req.user.id;
        console.log(req.user)
        const response = await findChatByIdService(userId);
        res.status(StatusCodes.OK).json(customSuccessResponse('admin chat fetched successfully',response))
    } catch (error) {
        console.log("find chats controller error -", error);
        res.status(StatusCodes.BAD_REQUEST).json(customErrorResponse('something is wrong with find chat controller', error))
    }
};

export const findUserChatListByIAdminController = async ( req:Request,res:Response)=>{
    try {
        const userId = req.user.id;
        const response = await findAdminChatByIdService(userId);
        res.status(StatusCodes.OK).json(customSuccessResponse('user chat fetched successfully',response))
    } catch (error) {
        console.log("find chats controller error -", error);
        res.status(StatusCodes.BAD_REQUEST).json(customErrorResponse('something is wrong with find chat controller', error))
    }
}