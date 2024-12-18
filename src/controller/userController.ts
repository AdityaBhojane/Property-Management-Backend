import { Request, Response } from "express";
import { deleteUserService, getUserService, updateUserService } from "../service/userService"
import customSuccessResponse from "../utils/customSuccess";
import { StatusCodes } from "http-status-codes";
import customErrorResponse from "../utils/customError";



export const getUserController = async (req:Request,res:Response)=>{
    try {
        const id = req.params.id;
        console.log(id)
        const response = await getUserService(id);
        res.status(StatusCodes.OK).json(customSuccessResponse('user fetched successfully',{
            username:response?.username,
            email:response?.email
        }))
    } catch (error) {
        console.log("get user controller", error);
        res.status(StatusCodes.BAD_REQUEST).json(customErrorResponse('something is wrong with get user controller',error))
    }
};

export const updateUserController = async (req:Request,res:Response)=>{
    try {
        const username = req.body.username;
        const id = req.params.id
        const response = await updateUserService(id,{username});
        res.status(StatusCodes.OK).json(customSuccessResponse('user updated successfully',response))
    } catch (error) {
        console.log("get user controller", error);
        res.status(StatusCodes.BAD_REQUEST).json(customErrorResponse('something is wrong with get user controller',error))
    }
};

export const deleteUserController = async (req:Request,res:Response)=>{
    try {
        const id = req.params.id
        const response = await deleteUserService(id);
        res.status(StatusCodes.OK).json(customSuccessResponse('user deleted successfully',response))
    } catch (error) {
        console.log("get user controller", error);
        res.status(StatusCodes.BAD_REQUEST).json(customErrorResponse('something is wrong with get user controller',error))
    }
};