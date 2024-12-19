import { Router } from "express";
import authRouter from "./authRouter";
import userRouter from "./userRouter";
import propertyRouter from "./propertiesRouter";



const v1Router = Router();

v1Router.use('/auth',authRouter);
v1Router.use('/user', userRouter);
v1Router.use('/property', propertyRouter)

export default v1Router;