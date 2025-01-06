import Property from "../models/protpertiesSchema";
import crudRepository from "./crudRepository";


export const PropertyRepository = {
    ...crudRepository(Property),
    getAllPropertiesById:async(userId:string)=> await Property.find({creator:userId}),
}