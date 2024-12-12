import { Router } from "express";
import { validationRequest } from "../../middlewares/userValidation";
import { signInSchema, signUpSchema } from "../../validation/zodSchema";
import { signInController, signUpController } from "../../controller/authController";


const authRouter = Router();
authRouter.use('/signup',validationRequest(signUpSchema),signUpController);
authRouter.use('/signin',validationRequest(signInSchema),signInController);

export default authRouter;