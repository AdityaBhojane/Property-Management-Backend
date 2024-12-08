import argon2  from "argon2";
import mongoose, { Document, Types } from "mongoose";

interface UserType extends Document{
    _id: Types.ObjectId;
    username:string;
    email:string;
    password:string;
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
            /^[a-zA-Z0-9]+$/,
            'schema : username must contain only letters and numbers'
        ]
    },
    password:{
        type:String,
        required:[true, 'password is required'],
        minLength:[4,'must contain at least 3 characters'],
    }
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