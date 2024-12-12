import mongoose from "mongoose";
import { DB_URL } from "./severConfig";


export default async function connectDB(){
    try {
        await mongoose.connect(DB_URL as string);
        console.log('Connected to DB')
    } catch (error) {
        console.log("Connection failed ", error)
    }
}