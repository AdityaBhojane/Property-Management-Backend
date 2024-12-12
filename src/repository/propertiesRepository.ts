import Property from "../models/protpertiesSchema";
import crudRepository from "./crudRepository";


export const PropertyRepository = {
    ...crudRepository(Property),
    getAllProperties:async()=> await Property.find(),

}