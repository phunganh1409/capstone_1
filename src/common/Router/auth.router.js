import express from 'express';
import authController from '../controller/auth.controller';
import protect from '../middleware/proctec.middleware';


const authRouter = express.Router()

authRouter.post(`/register`, authController.register);
authRouter.post(`/login`, authController.login) 

export default authRouter