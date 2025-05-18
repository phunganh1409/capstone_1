import express from "express"
import userController from "../controller/user.controller"
import protect from "../middleware/proctec.middleware"

const userRouter = express.Router()
userRouter.use(protect)
userRouter.get(`/getUser`, userController.getUser );
userRouter.get(`/getSaveUser`, userController.getSaveUser );
userRouter.get(`/getCreateImage`, userController.getCreateImage );
userRouter.get(`/deleteImage/:imageId`, userController.deleteImage );
userRouter.post(`/createImage`, userController.createImage );
userRouter.put(`/createInfo`, userController.createInfo );




export default userRouter