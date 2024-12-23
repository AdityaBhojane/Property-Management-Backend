import { StatusCodes } from "http-status-codes";
import customErrorResponse from "../utils/customError";
import { Request, Response } from "express";
import { createPropertyService, deletePropertyService, getPropertyService, updatePropertyService } from "../service/propertyService";
import { userRepository } from "../repository/userRespository";
import customSuccessResponse from "../utils/customSuccess";


export const createPropertyController = async (req: Request, res: Response) => {
    try {
        if (!req.file || !req.file.path) {
            res.status(400).json({
                success: false,
                message: "Image is required"
            });
            return;
        }
        const images = req.file.path;
        const { 
            name,
            description,
            price,
            location,
            city,
            purpose,
            PropertyType,
        } = req.body;

        console.log(req.user)

        const user = await userRepository.findByEmail(req.user.email);

        if(!user){
            res.status(StatusCodes.BAD_REQUEST).json(customErrorResponse('User not found', StatusCodes.BAD_REQUEST));
            return;
        }

        const creator = user._id 

        if (!name || !description || !images || !price || !location || !purpose || !PropertyType) {
            res.status(StatusCodes.BAD_REQUEST).json(customErrorResponse('all fields are required', StatusCodes.BAD_REQUEST))
        }
        const response = await createPropertyService(req.user.email,{
            name,
            description,
            images,
            price,
            location,
            city,
            purpose,
            PropertyType,
            creator
        });

        res.status(StatusCodes.OK).json(customSuccessResponse('property successfully',response))

    } catch (error) {
        console.log("create property controller error -", error);
        res.status(StatusCodes.BAD_REQUEST).json(customErrorResponse('something is wrong with create property controller', error))
    }
}


export const updatePropertyController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const { 
            name,
            description,
            images,
            price,
            location,
            city,
            purpose,
            PropertyType,
        } = req.body;
        
        const response = await updatePropertyService(id,{
            name,
            description,
            images,
            price,
            location,
            city,
            purpose,
            PropertyType,
        })
        res.status(StatusCodes.OK).json(customSuccessResponse('property updated successfully',response))
    } catch (error) {
        console.log("update property controller error", error);
        res.status(StatusCodes.BAD_REQUEST).json(customErrorResponse('something is wrong with update property controller', error))
    }
}


export const deletePropertyController = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        if(!userId) res.status(StatusCodes.BAD_REQUEST).json(customErrorResponse('user id required', StatusCodes.BAD_REQUEST));
        const {propertyId} = req.body;
        if(!propertyId) res.status(StatusCodes.BAD_REQUEST).json(customErrorResponse('property id required', StatusCodes.BAD_REQUEST));
        const response = await deletePropertyService(propertyId,userId)
        res.status(StatusCodes.OK).json(customSuccessResponse('property deleted successfully',response))
    } catch (error) {
        console.log("delete property controller error", error);
        res.status(StatusCodes.BAD_REQUEST).json(customErrorResponse('something is wrong with delete property controller', error))
    }
}

export const getPropertyController = async (req: Request, res: Response) => {
    try {
        const response = await getPropertyService()
        res.status(StatusCodes.OK).json(customSuccessResponse('property fetched successfully',response))
    } catch (error) {
        console.log("get property controller error", error);
        res.status(StatusCodes.BAD_REQUEST).json(customErrorResponse('something is wrong with get property controller', error))
    }
}