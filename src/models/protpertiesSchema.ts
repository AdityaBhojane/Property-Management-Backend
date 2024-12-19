import mongoose, { Document, Schema, Types } from "mongoose";

interface PropertyTypes extends Document{
  _id: Types.ObjectId; 
  name:string;
  description:string;
  images:string;
  price:number,
  location:string,
  purpose:string,
  PropertyType:string,
  creator:Types.ObjectId,
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
        type:String,
        required:[true,'image is required']
    },
    price:{
        type:Number,
        required:[true, 'price is required']
    },
    location:{
        type:String,
        required:[true,'location is required']
    },
    purpose:{
        type:String,
        enum:["rent","sale"],
        required:true
    },
    PropertyType:{
        type:String,
        enum: ["apartment", "villa", "office", "shop", "plot"], 
        required: [true,"enter valid property type"]
    },
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
});

const Property = mongoose.model<PropertyTypes>('Property', PropertySchema);

export default Property;