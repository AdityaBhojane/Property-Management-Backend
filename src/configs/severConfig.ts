import dotenv from 'dotenv';
dotenv.config();

export const DB_URL = process.env.DB_URL;
export const JWT_USER_SECRET = process.env.JWT_USER_SECRET;
export const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET;
export const PORT = process.env.PORT || 5001;
export const JWT_EXPIRY = process.env.JWT_EXPIRY || '1hr';
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
export const ADMIN_APP_KEY = process.env.ADMIN_APP_KEY;
export const REDIS_URL = process.env.REDIS_URL;
export const REDIS_PORT =parseInt(process.env.REDIS_PORT || '0', 10) || undefined;
export const OTP_EXPIRATION = parseInt(process.env.OTP_EXPIRATION || "0");
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET =process.env.CLOUDINARY_API_SECRET;
// const REDIS_PORT = process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : undefined; base 10 