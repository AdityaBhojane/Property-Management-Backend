import { Router } from "express";
import authRouter from "./authRouter";
import userRouter from "./userRouter";
import propertyRouter from "./propertiesRouter";
import chartsDataRouter from "./chartsDataRouter";



const v1Router = Router();

v1Router.use('/auth',authRouter);
v1Router.use('/user', userRouter);
v1Router.use('/property', propertyRouter)
v1Router.use('/stats', chartsDataRouter)

export default v1Router;