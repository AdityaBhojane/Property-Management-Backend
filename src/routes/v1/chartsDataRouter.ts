import { Router } from "express";
import { chatDataController } from "../../controller/chartDataController";


const chartsDataRouter = Router()

chartsDataRouter.get("/json",chatDataController)


export default chartsDataRouter;