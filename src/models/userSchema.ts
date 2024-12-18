import argon2  from "argon2";
import mongoose, { Document, Types } from "mongoose";
import { string } from "zod";

interface UserType extends Document{
    _id: Types.ObjectId;
    username:string;
    email:string;
    password:string;
    role:string;
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
    return await argon2.verify(this.password, password)
};

const User = mongoose.model<UserType>("User", userSchema);

export default User;