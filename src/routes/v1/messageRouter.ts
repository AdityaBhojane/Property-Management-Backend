import { Router } from "express";
import { jwtVerify } from "../../middlewares/authMiddleware";
import { getMessagesController } from "../../controller/messageController";


const messageRouter = Router();

messageRouter.get('/:participantId', jwtVerify, getMessagesController);

export default messageRouter