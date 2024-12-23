import { Router } from "express";
import { jwtVerify } from "../../middlewares/authMiddleware";
import { deleteUserController, getUserController, updateUserController } from "../../controller/userController";
import { cloudinaryUploader } from "../../configs/multerConfig";


const userRouter = Router();

userRouter.get('/',jwtVerify,getUserController);
userRouter.put('/',jwtVerify,cloudinaryUploader.single('images'),updateUserController);
userRouter.delete('/',jwtVerify,deleteUserController);

export default userRouter;