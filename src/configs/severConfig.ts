import dotenv from 'dotenv';
dotenv.config();

export const DB_URL = process.env.DB_URL;
export const JWT_SECRET = process.env.JWT_SECRET;
export const PORT = process.env.PORT || 5001;
export const JWT_EXPIRY = process.env.JWT_EXPIRY || '1hr';