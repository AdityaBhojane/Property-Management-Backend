import { Router } from "express";
import { chatDataController } from "../../controller/chartDataController";
import { jwtVerify } from "../../middlewares/authMiddleware";


const chartsDataRouter = Router()

chartsDataRouter.get("/json",jwtVerify ,chatDataController)


export default chartsDataRouter;