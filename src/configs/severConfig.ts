import dotenv from 'dotenv';
dotenv.config();

export const DB_URL = process.env.DB_URL;
export const JWT_SECRET = process.env.JWT_SECRET;
export const PORT = process.env.PORT || 5001;
export const JWT_EXPIRY = process.env.JWT_EXPIRY || '1hr';
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
export const ADMIN_APP_KEY = process.env.ADMIN_APP_KEY;
export const REDIS_URL = process.env.REDIS_URL;
export const REDIS_PORT =parseInt(process.env.REDIS_PORT || '0', 10) || undefined;
// const REDIS_PORT = process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : undefined; base 10 