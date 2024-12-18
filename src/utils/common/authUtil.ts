import jwt from 'jsonwebtoken'
import { JWT_ADMIN_SECRET, JWT_EXPIRY, JWT_USER_SECRET,  } from '../../configs/severConfig';
import { Types } from 'mongoose';

interface IPayload {
    id?:string,
    email?:string
}

export const createJWT = (payload:IPayload, role:string)=>{
    if(role==="admin"){
        return jwt.sign(payload, JWT_ADMIN_SECRET as string,{expiresIn:JWT_EXPIRY}) 
    }else{
        return jwt.sign(payload, JWT_USER_SECRET as string,{expiresIn:JWT_EXPIRY}) 
    }
}