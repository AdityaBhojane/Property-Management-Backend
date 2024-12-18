import { Router } from "express";
import authRouter from "./authRouter";
import userRouter from "./userRouter";


const v1Router = Router();

v1Router.use('/auth',authRouter);
v1Router.use('/user', userRouter)

export default v1Router;