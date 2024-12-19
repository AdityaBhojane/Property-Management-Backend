import { Router } from "express";
import { jwtVerifyAdmin } from "../../middlewares/authMiddleware";
import { createPropertyController, deletePropertyController, updatePropertyController } from "../../controller/propertiesController";
import { cloudinaryUploader } from "../../configs/multerConfig";


const propertyRouter = Router();

propertyRouter.post('/create', jwtVerifyAdmin, cloudinaryUploader.single('images'), createPropertyController);
propertyRouter.put("/:id",jwtVerifyAdmin,cloudinaryUploader.single('images'), updatePropertyController);
propertyRouter.delete("/:id", jwtVerifyAdmin, deletePropertyController)



export default propertyRouter;