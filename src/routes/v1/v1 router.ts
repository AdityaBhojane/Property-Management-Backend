import { Router } from "express";
import authRouter from "./authRouter";
import userRouter from "./userRouter";
import propertyRouter from "./propertiesRouter";
import chartsDataRouter from "./chartsDataRouter";
import agentRouter from "./agentRouter";
import messageRouter from "./messageRouter";



const v1Router = Router();

v1Router.use('/auth',authRouter);
v1Router.use('/user', userRouter);
v1Router.use('/property', propertyRouter)
v1Router.use('/stats', chartsDataRouter)
v1Router.use('/agents', agentRouter)
v1Router.use('/message', messageRouter)

export default v1Router;