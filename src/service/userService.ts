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

