
import { mailObjectValidation } from "../helpers/mailObject";
import otpGenerator from "../helpers/otpGenerator";
import { addEmailToQueue } from "../queues/mailQueue";
import { redisClient } from "../redis/redisClient";
import storeOtp from "../redis/storeOtp";
import { validateOTP } from "../redis/validateOtp";
import { userRepository } from "../repository/userRespository"
import { createJWT } from '../utils/common/authUtil';

interface Idata {
    username?:string,
    password:string,
    email:string
}

export const  userSignUpService = async (data:Idata)=>{
    try {
        const response = await (await userRepository).create(data);
        return response
    } catch (error) {
        console.log(error);
        throw error
    }
};

export const userSignInService = async (data:Idata)=>{
    try {
        const {email, password} = data;
        const user = await userRepository.findByEmail(email);
        if(!user) throw new Error('Invalid email and password');
        const isPasswordMatch = await user.verifyPassword(password);
        if(!isPasswordMatch) throw new Error('Password is not valid');
        const Otp = otpGenerator();
        storeOtp(email,Otp);
         const storedOtp = await redisClient.get(email);
        addEmailToQueue(mailObjectValidation(email,parseInt(storedOtp || "0")));

        return {
            username:user.username,
            email,
            token:createJWT({id:user._id})
        }
    } catch (error) {
        console.log(error);
        throw error
    }
}

export const validateOtpService = async(email:string,otp:number)=>{
    try {
        const response = await validateOTP(email,otp);
        console.log(email,otp)
        return response
    } catch (error) {
        console.log("error in otp validation", error)
    }
}

