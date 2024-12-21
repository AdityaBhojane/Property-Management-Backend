
import { redisClient } from "./redisClient";

export const validateOTP = async (email: string, otp: number | string): Promise<boolean> => {
  try {
    const storedOtp = await redisClient.get(email);
    const userOtp = Number(otp);

    if(isNaN(userOtp)){
        console.log('wrong otp format');
        return false
    }

    if (!storedOtp) {
      console.log("No OTP found or OTP expired");
      return false;
    }

    if (parseInt(storedOtp) === userOtp) {
      console.log("OTP validated successfully");
      // await redisClient.del(email); // Remove OTP after successful validation
      return true;
    }

    console.log("Invalid OTP");
    return false;
  } catch (error) {
    console.error("Error validating OTP:", error);
    return false;
  }
};
