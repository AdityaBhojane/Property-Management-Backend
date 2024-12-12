import { Document, Model } from "mongoose";

interface UserData {
    username?: string;
    email?: string;
    password?: string;
  }
  

export default function crudRepository<T extends Document>(model:Model<T>){
    return {
        create:async(data:UserData):Promise<T>=> await model.create(data),
        get:async(id:number):Promise<T | null>=> await model.findById(id),
        update:async(id:number ,data:UserData):Promise<T | null>=> await model.findByIdAndUpdate(id, data, {new:true}),
        delete:async(id:number):Promise<T | null>=> await model.findByIdAndDelete(id),
        deleteMany:async(ids:string[]):Promise<{deletedCount?:number}> => await model.deleteMany({ _id: { $in: ids } })
    }
}


