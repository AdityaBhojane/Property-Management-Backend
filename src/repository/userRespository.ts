import User from "../models/userSchema";
import crudRepository from "./crudRepository";


export const userRepository = {
    ...crudRepository(User),
    findByEmail:async(email:string)=> await User.findOne({email}),
    getAgent: async () => await User.find({ properties: { $exists: true, $ne: [] } }).select('-password')
    
}