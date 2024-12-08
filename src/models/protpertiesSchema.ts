import mongoose, { Document, Schema } from "mongoose";

interface PropertyTypes extends Document{
  name:string;
  description:string;
  images:File;
  price:number,
  location:string,
  PropertyType:string,
  creatorId:string,
};

const PropertySchema = new Schema({
    name:{
        type:String,
        required:[true,'name is required'],
        minLength:[5, 'must contain at least 5 characters']
    },
    description:{
        type:String,
        required:[true, 'description is required'],
        minLength:[10, 'must contain at least 10 characters']
    },
    images:{
        type:File,
        required:[true,'image file is required']
    },
    price:{
        type:Number,
        required:[true, 'price is required']
    },
    location:{
        type:String,
        required:[true,'location is required']
    },
    PropertyType:{
        type:String
    },
    creatorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
});

const Property = mongoose.model<PropertyTypes>('Property', PropertySchema);

export default Property;