import express from "express";
import ImageController from "../controller/image.controller";
import protect from "../middleware/proctec.middleware";

const imageRouter = express.Router();
imageRouter.use(protect)
imageRouter.get(`/getImage`,ImageController.getImage );
imageRouter.get(`/searchImage`, ImageController.searchImage);
imageRouter.get(`/imageById/:id`, ImageController.getImageById);
imageRouter.get(`/commentById/:id`, ImageController.commentById);
imageRouter.get(`/checkImageSave/:id`, ImageController.checkImageSave);
imageRouter.post(`/createComment`, ImageController.createComment);




export default imageRouter;