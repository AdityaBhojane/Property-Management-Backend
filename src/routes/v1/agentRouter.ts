import { Router } from "express";
import { jwtVerify } from "../../middlewares/authMiddleware";
import { getAgentController } from "../../controller/agentController";


const agentRouter = Router();

agentRouter.get('/', jwtVerify, getAgentController);

export default agentRouter;