import { Document, Model } from "mongoose";


  

export default function crudRepository<T extends Document>(model:Model<T>){
    return {
        create:async(data:Partial<T>):Promise<T>=> await model.create(data),
        get:async(id:string):Promise<T | null>=> await model.findById(id),
        update:async(id:string ,data:Partial<T>):Promise<T | null>=> await model.findByIdAndUpdate(id, data, {new:true}),
        delete:async(id:string):Promise<T | null>=> await model.findByIdAndDelete(id),
        deleteMany:async(ids:string[]):Promise<{deletedCount?:number}> => await model.deleteMany({ _id: { $in: ids } })
    }
}
// Partial<T>

