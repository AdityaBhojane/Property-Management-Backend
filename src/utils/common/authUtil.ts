import jwt from 'jsonwebtoken'
import { JWT_EXPIRY, JWT_SECRET } from '../../configs/severConfig';
import { Types } from 'mongoose';

interface IPayload {
    id:Types.ObjectId,
    email?:string
}

export const createJWT = (payload:IPayload)=>{
    return jwt.sign(payload, JWT_SECRET as string,{expiresIn:JWT_EXPIRY}) 
}