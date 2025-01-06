import argon2  from "argon2";
import mongoose, { Document, Types } from "mongoose";

 export interface IUser extends Document{
    _id: Types.ObjectId;
    username:string;
    email:string;
    password:string;
    role:string;
    city:string;
    phone:string;
    images:string;
    properties:mongoose.Types.ObjectId[],
    isVerify:Boolean,
    verifyPassword:(password:string)=>Promise<boolean>;
}


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, 'username is required'],
        minLength:[3,'must contain at least 3 characters'],
        unique:true,
    },
    email:{
        type:String,
        required:[true, 'email is required'],
        match:[ 
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please fill a valid email address'
        ]
    },
    password:{
        type:String,
        required:[true, 'password is required'],
        minLength:[4,'must contain at least 3 characters'],
    },
    phone:{
        type:String,
    },
    city:{
        type:String,
    },
    images:{
        type:String,
    },
    properties:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Property"
    }],
    isVerify:{
        type:Boolean,
        default:false,
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
},{timestamps:true});

userSchema.pre("save", async function (next) {
    if(this.isModified("password")){
        this.password = await argon2.hash(this.password)
    }
    next();
});

userSchema.methods.verifyPassword = async function (password:string) {
    const response = await argon2.verify(this.password, password);
    return response
};

const User = mongoose.model<IUser>("User", userSchema);

export default User;