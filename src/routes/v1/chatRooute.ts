import { Router } from "express";
import { jwtVerify, jwtVerifyAdmin } from "../../middlewares/authMiddleware";
import { createChatController, findChatByIdController, findUserChatListByIAdminController } from "../../controller/chatController";


const chatRouter = Router();

chatRouter.post('/chat',jwtVerify,createChatController);
chatRouter.get('/getChat',jwtVerify,findChatByIdController);
chatRouter.get('/userChat',jwtVerifyAdmin,findUserChatListByIAdminController);

export default chatRouter; 