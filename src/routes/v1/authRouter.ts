import { Router } from "express";
import { validationRequest } from "../../middlewares/userValidation";
import { signInSchema, signUpSchema } from "../../validation/zodSchema";
import { signInAdminController, signInController, signUpController } from "../../controller/authController";



const authRouter = Router();
authRouter.use('/signup',validationRequest(signUpSchema),signUpController);
authRouter.use('/signin',validationRequest(signInSchema),signInController);
authRouter.use('/admin',validationRequest(signInSchema),signInAdminController);

export default authRouter;  
// why signin endpoint forward request further if user /signin/admin 