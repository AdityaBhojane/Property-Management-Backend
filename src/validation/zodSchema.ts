import {z} from 'zod';

export const signUpSchema = z.object({
    username: z.string().min(3, 'username must be having at least 3 characters'),
    email:z.string().email('invalid email'),
    password:z.string().min(6,'password must be at least 6 characters')
})

export const signInSchema = z.object({
    email: z.string().min(3, 'username must be having at least 3 characters'),
    password:z.string().min(6,'password must be at least 6 characters')
})