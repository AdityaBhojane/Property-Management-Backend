import { Router } from "express";
import { jwtVerify } from "../../middlewares/authMiddleware";
import { getMessagesController } from "../../controller/messageController";


const messageRouter = Router();

messageRouter.get('/:senderId/:userId', jwtVerify, getMessagesController);

export default messageRouter