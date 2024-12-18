import { Router } from "express";
import { validationRequest } from "../../middlewares/userValidation";
import { signInSchema, signUpSchema } from "../../validation/zodSchema";
import { otpController, signInAdminController, signInController, signUpController } from "../../controller/authController";
import { jwtVerify } from "../../middlewares/authMiddleware";


const authRouter = Router();
authRouter.use('/signup',validationRequest(signUpSchema),signUpController);
authRouter.use('/signin',validationRequest(signInSchema),signInController);
authRouter.use('/admin',validationRequest(signInSchema),signInAdminController);
authRouter.use('/otp/:id',otpController);

export default authRouter;  
// why signin endpoint forward request further if user /signin/admin 