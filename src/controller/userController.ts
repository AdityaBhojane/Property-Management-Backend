import { Request, Response } from "express";
import { deleteUserService, getUserService, updateUserService } from "../service/userService"
import customSuccessResponse from "../utils/customSuccess";
import { StatusCodes } from "http-status-codes";
import customErrorResponse from "../utils/customError";



export const getUserController = async (req:Request,res:Response)=>{
    try {
        const id = req.user.id;
        if(!id) res.status(StatusCodes.BAD_REQUEST).json(customErrorResponse('id is required', StatusCodes.BAD_REQUEST));
        const response = await getUserService(id);
        res.status(StatusCodes.OK).json(customSuccessResponse('user fetched successfully',{
            id:response?.id,
            username:response?.username,
            email:response?.email,
            role:response?.role,
            images:response?.images,
            city:response?.city,
            phone:response?.phone
        }))
    } catch (error) {
        console.log("get user controller", error);
        res.status(StatusCodes.BAD_REQUEST).json(customErrorResponse('something is wrong with get user controller',error))
    }
};

export const updateUserController = async (req:Request,res:Response)=>{
    try {
        const updateObject = req.body;

        if (req.file?.path) {
            const images = req.file.path;
            updateObject.images = images;
        }

        const id = req.user.id;
        console.log(updateObject)
        if(!updateObject){
            res.status(StatusCodes.BAD_REQUEST).json(customErrorResponse('need some data to updated', StatusCodes.BAD_REQUEST));
            return;
        };
        const response = await updateUserService(id,updateObject);
        res.status(StatusCodes.OK).json(customSuccessResponse('user updated successfully',response))
    } catch (error) {
        console.log("get user controller", error);
        res.status(StatusCodes.BAD_REQUEST).json(customErrorResponse('something is wrong with get user controller',error))
    }
};

export const deleteUserController = async (req:Request,res:Response)=>{
    try {
        const id = req.user.id
        if(!id) res.status(StatusCodes.BAD_REQUEST).json(customErrorResponse('id is required', StatusCodes.BAD_REQUEST))
        const response = await deleteUserService(id);
        res.status(StatusCodes.OK).json(customSuccessResponse('user deleted successfully',response))
    } catch (error) {
        console.log("get user controller", error);
        res.status(StatusCodes.BAD_REQUEST).json(customErrorResponse('something is wrong with get user controller',error))
    }
};