import { Router } from "express";
import { jwtVerify } from "../../middlewares/authMiddleware";
import { deleteUserController, getUserController, updateUserController } from "../../controller/userController";


const userRouter = Router();

userRouter.get('/:id',jwtVerify,getUserController);
userRouter.put('/:id',jwtVerify,updateUserController);
userRouter.delete('/:id',jwtVerify,deleteUserController);

export default userRouter;