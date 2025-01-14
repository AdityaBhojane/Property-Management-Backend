import { StatusCodes } from "http-status-codes";
import { userRepository } from "../repository/userRespository"
import { createJWT } from '../utils/common/authUtil';
import ErrorHelper from "../utils/ErrorHelper";

interface Idata {
    username?:string,
    password:string,
    email:string
}

export const  userSignUpService = async (data:Idata)=>{
    try {
        const user = await userRepository.findByEmail(data.email);
        if(user) throw new ErrorHelper("User already exist with username or email", StatusCodes.BAD_REQUEST, {
            email:user.email
        })
        const response = await userRepository.create(data);
        return {
            id:response.id,
            username:response.username,
            email:response.email,
            role:response.role
        }
    } catch (error) {
        console.log(error); 
        throw new ErrorHelper('user sign up field',StatusCodes.FORBIDDEN, error);
    }
};

export const userSignInService = async (data:Idata)=>{
    try {
        const {email, password} = data;
        if(!email || !password) throw new ErrorHelper('email Or password is required',StatusCodes.BAD_REQUEST,"email and password required");
        const user = await userRepository.findByEmail(email);
        if(!user) throw new ErrorHelper('Invalid email Or password',StatusCodes.BAD_REQUEST,"invalid email");
        const isPasswordMatch = await user.verifyPassword(password);
        if(!isPasswordMatch) throw new ErrorHelper('Invalid Password',StatusCodes.BAD_REQUEST,"invalid email");
        if(!user.isVerify) throw new ErrorHelper('verification required',StatusCodes.BAD_REQUEST,"user not verified");

        return {
            id:user.id,
            username:user.username,
            email,
            role:user.role,
            token:createJWT({id:user.id, email},"user")
        }
    } catch (error) {
        console.log(error);
        throw new ErrorHelper('user sign in field',StatusCodes.BAD_REQUEST, error);
    }
}



export const userSignInAdminService = async (data:Idata)=>{
    try {
        const {email, password} = data;
        const user = await userRepository.findByEmail(email);
        if(!user) throw new ErrorHelper('Invalid email and password',StatusCodes.BAD_REQUEST,"invalid email");
        const isPasswordMatch = await user.verifyPassword(password);
        if(!isPasswordMatch) throw new ErrorHelper('Invalid password',StatusCodes.BAD_REQUEST,"invalid email");
        const userId = user.id
        return {
            id:user._id,
            username:user.username,
            email,
            token:createJWT({id:userId,email},"admin")
        }
    } catch (error) {
        console.log(error);
        throw new ErrorHelper('user sign in with admin field',StatusCodes.BAD_REQUEST, error);
    }
}
