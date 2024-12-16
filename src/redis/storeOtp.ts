import { OTP_EXPIRATION } from "../configs/severConfig";
import { redisClient } from "./redisClient";

export default async function storeOtp(email: string, otp: number): Promise<void> {
  try {
    console.log("Storing OTP:", email, otp);
    await redisClient.setex(email, OTP_EXPIRATION, otp.toString());
    console.log("OTP stored successfully");
  } catch (error) {
    console.error("Error storing OTP:", error);
    throw error;
  }
}
