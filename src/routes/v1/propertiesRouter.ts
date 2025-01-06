import { Router } from "express";
import { jwtVerify, jwtVerifyAdmin } from "../../middlewares/authMiddleware";
import { createPropertyController, deletePropertyController, getPropertyByIdController, getPropertyController, updatePropertyController } from "../../controller/propertiesController";
import { cloudinaryUploader } from "../../configs/multerConfig";


const propertyRouter = Router();

propertyRouter.post('/create', jwtVerifyAdmin, cloudinaryUploader.single('images'), createPropertyController);
propertyRouter.put("/:id",jwtVerifyAdmin,cloudinaryUploader.single('images'), updatePropertyController);
propertyRouter.delete("/:id", jwtVerifyAdmin, deletePropertyController);
propertyRouter.get("/",jwtVerify,getPropertyController)
propertyRouter.get("/me",jwtVerifyAdmin,getPropertyByIdController)



export default propertyRouter;