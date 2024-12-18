import Property from "../models/protpertiesSchema";
import crudRepository from "./crudRepository";


export const PropertyRepository = {
    ...crudRepository(Property),
    getAllProperties:async()=> await Property.find(),
    deletePropertyById:async(id:string)=>await Property.findById({ _id: id }).populate("creator"),

}