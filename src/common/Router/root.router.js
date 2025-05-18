import express from 'express';
import authRouter from './auth.router';
import imageRouter from './image.router';
import userRouter from './user.router';

 

const root = express.Router()

root.use(`/`, authRouter);
root.use(`/`,imageRouter)
root.use(`/`, userRouter)



export default root