import { Router } from "express";
import { jwtVerify } from "../../middlewares/authMiddleware";
import { createChatController, findChatByIdController } from "../../controller/chatController";


const chatRouter = Router();

chatRouter.post('/chat',jwtVerify,createChatController);
chatRouter.get('/chat',jwtVerify,findChatByIdController);

export default chatRouter;