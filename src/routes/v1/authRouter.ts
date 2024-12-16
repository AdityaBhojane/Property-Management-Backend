import { Router } from "express";
import { validationRequest } from "../../middlewares/userValidation";
import { signInSchema, signUpSchema } from "../../validation/zodSchema";
import { otpController, signInController, signUpController } from "../../controller/authController";
import { jwtVerify } from "../../middlewares/authMiddleware";


const authRouter = Router();
authRouter.use('/signup',validationRequest(signUpSchema),signUpController);
authRouter.use('/signin',validationRequest(signInSchema),signInController);
authRouter.use('/otp', jwtVerify ,otpController);

export default authRouter;