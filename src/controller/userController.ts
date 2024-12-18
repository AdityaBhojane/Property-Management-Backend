import { Request, Response } from "express";
import { deleteUserService, getUserService, updateUserService } from "../service/userService"
import customSuccessResponse from "../utils/customSuccess";
import { StatusCodes } from "http-status-codes";
import customErrorResponse from "../utils/customError";



export const getUserController = async (req:Request,res:Response)=>{
    try {
        const id = req.params.id;
        if(!id) res.status(StatusCodes.BAD_REQUEST).json(customErrorResponse('id is required', StatusCodes.BAD_REQUEST));
        const response = await getUserService(id);
        res.status(StatusCodes.OK).json(customSuccessResponse('user fetched successfully',{
            id:response?.id,
            username:response?.username,
            email:response?.email,
            role:response?.role
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
        if(!username || !id)res.status(StatusCodes.BAD_REQUEST).json(customErrorResponse('username, email and password is required', StatusCodes.BAD_REQUEST));
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
        if(!id) res.status(StatusCodes.BAD_REQUEST).json(customErrorResponse('id is required', StatusCodes.BAD_REQUEST))
        const response = await deleteUserService(id);
        res.status(StatusCodes.OK).json(customSuccessResponse('user deleted successfully',response))
    } catch (error) {
        console.log("get user controller", error);
        res.status(StatusCodes.BAD_REQUEST).json(customErrorResponse('something is wrong with get user controller',error))
    }
};