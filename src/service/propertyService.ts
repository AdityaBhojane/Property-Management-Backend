import { StatusCodes } from "http-status-codes"
import { PropertyRepository } from "../repository/propertiesRepository"
import { userRepository } from "../repository/userRespository"
import ErrorHelper from "../utils/ErrorHelper"
import { Types } from "mongoose"

interface IPropertyData {
    name: string
    description: string
    images: string
    price: number
    location: string
    city:string  
    cityPin:number
    purpose: string
    PropertyType: string
    creator?: Types.ObjectId
} 


export const createPropertyService = async (email:string,propertyData: IPropertyData) => {
    // const session = mongoose.startSession();
    try {
        const user = await userRepository.findByEmail(email);
        if (!user) throw new ErrorHelper('user not found', StatusCodes.NOT_FOUND, user);
        const name = propertyData.name.trim();
        const response = await PropertyRepository.create({
            name,
            description:propertyData.description,
            images:propertyData.images,
            price:propertyData.price,
            location:propertyData.location,
            cityPin:propertyData.cityPin,
            city:propertyData.city,
            purpose:propertyData.purpose,
            PropertyType:propertyData.PropertyType,
            creator:user._id
        });
        console.log(response)
         user.properties.push(response._id);
         await user.save();
         return response;
    } catch (error) {
        console.log("Create property service error -", error)
        throw new ErrorHelper('user sign in with admin field', StatusCodes.BAD_REQUEST, error);
    }
};


export const updatePropertyService = async (id: string, updatedData: IPropertyData) => {
    try {
        const updatedProperty = await PropertyRepository.update(id, {
            name: updatedData.name,
            description: updatedData.description,
            images: updatedData.images,
            price: updatedData.price,
            location: updatedData.location,
            purpose: updatedData.purpose,
            PropertyType: updatedData.PropertyType
        });
        if (!updatedProperty) {
            throw new ErrorHelper('Property not found', StatusCodes.NOT_FOUND,"Not Found");
        }
        return updatedProperty;
    } catch (error) {
        console.log('Update property service error -', error);
        throw new ErrorHelper('Unable to update property', StatusCodes.BAD_REQUEST, error);
    }
};


// Property Service - deletePropertyService.ts
export const deletePropertyService = async (propertyId: string, email: string) => {
    try {
        const user = await userRepository.get(email);
        if (!user) throw new ErrorHelper('User not found', StatusCodes.NOT_FOUND, user);

        const property = await PropertyRepository.delete(propertyId);
        if (!property) throw new ErrorHelper('Property not found', StatusCodes.NOT_FOUND, "Not Found");

        // Remove the property ID from the user's properties array
        user.properties = user.properties.filter((propId) => propId.toString() !== propertyId);
        await user.save();

        return { message: 'Property deleted successfully' };
    } catch (error) {
        console.log('Delete property service error -', error);
        throw new ErrorHelper('Failed to delete property', StatusCodes.BAD_REQUEST, error);
    }
};


export const getPropertyService = async () => {
    try {
        const property = await PropertyRepository.getAll();
        if (!property) throw new ErrorHelper('Property not found', StatusCodes.NOT_FOUND, "Not Found");
        return { message: 'Property deleted successfully', property };
    } catch (error) {
        console.log('get property service error -', error);
        throw new ErrorHelper('Failed to get property', StatusCodes.BAD_REQUEST, error);
    }
};


 
export const getPropertyByIdService = async (userId:string) => {
    try {
        const property = await PropertyRepository.getAllPropertiesById(userId);
        if (!property) throw new ErrorHelper('Property not found', StatusCodes.NOT_FOUND, "Not Found");
        return { message: 'Property deleted successfully', property };
    } catch (error) {
        console.log('get property service error -', error);
        throw new ErrorHelper('Failed to get property', StatusCodes.BAD_REQUEST, error);
    }
};

