
import { StatusCodes } from "http-status-codes";
import { mailObjectValidation } from "../helpers/mailObject";
import otpGenerator from "../helpers/otpGenerator";
import { addEmailToQueue } from "../queues/mailQueue";
import { redisClient } from "../redis/redisClient";
import storeOtp from "../redis/storeOtp";
import { validateOTP } from "../redis/validateOtp";
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
        return response
    } catch (error) {
        console.log(error);
        throw new ErrorHelper('user sign up field',StatusCodes.FORBIDDEN, error);
    }
};

export const userSignInService = async (data:Idata)=>{
    try {
        const {email, password} = data;
        const user = await userRepository.findByEmail(email);
        if(!user) throw new ErrorHelper('Invalid email Or password',StatusCodes.BAD_REQUEST,"invalid email");
        const isPasswordMatch = await user.verifyPassword(password);
        if(!isPasswordMatch) throw new ErrorHelper('Invalid Password',StatusCodes.BAD_REQUEST,"invalid email");
        const Otp = otpGenerator();
        storeOtp(email,Otp);
         const storedOtp = await redisClient.get(email);
        addEmailToQueue(mailObjectValidation(email,parseInt(storedOtp || "0")));

        return {
            id:user.id,
            username:user.username,
            email,
            role:user.role
        }
    } catch (error) {
        console.log(error);
        throw new ErrorHelper('user sign in field',StatusCodes.BAD_REQUEST, error);
    }
}

export const validateOtpService = async(id:string,email:string,otp:number)=>{
    try {
        const response = await validateOTP(email,otp);
        return { 
            response,
            data:{
                token:createJWT({id, email},"user")
            }
        } 
    } catch (error) {
        console.log("error in otp validation", error);
        throw new ErrorHelper('user otp validation field',StatusCodes.BAD_REQUEST, error);
    }
};

export const userSignInAdminService = async (data:Idata)=>{
    try {
        const {email, password} = data;
        const user = await userRepository.findByEmail(email);
        if(!user) throw new ErrorHelper('Invalid email and password',StatusCodes.BAD_REQUEST,"invalid email");
        const isPasswordMatch = await user.verifyPassword(password);
        if(!isPasswordMatch) throw new ErrorHelper('Invalid password',StatusCodes.BAD_REQUEST,"invalid email");
        return {
            id:user._id,
            username:user.username,
            email,
            token:createJWT({email},"admin")
        }
    } catch (error) {
        console.log(error);
        throw new ErrorHelper('user sign in with admin field',StatusCodes.BAD_REQUEST, error);
    }
}

