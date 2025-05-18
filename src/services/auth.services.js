
import { BadRequestException } from "../common/helper/exception.helper";
import prisma from "../common/prisma/init.prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import tokenService from "./token.services";


const authServices = {
    register: async (req,res,next) => {
        const {ho_ten, email, mat_khau} = req.body;
        console.log({ho_ten, email, mat_khau});
       const userExsit = await prisma.users.findUnique({
            where: {
                email: email 
             }
        });
        if(userExsit) throw new BadRequestException("Email đã tồn tại");
        console.log({userExsit});

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(mat_khau, salt);
        

       const userNew = await prisma.users.create({
            data: {
                ho_ten : ho_ten,
                email: email,
                mat_khau: hashPassword,
            }
        });

        delete userNew.mat_khau;
        
      return userNew;
    },
    login: async (req,res,next) => {
        const {email, mat_khau} = req.body;
         const user = await prisma.users.findUnique({
            where: {
                email: email
            }
        });
        console.log({user});

        if(!user) throw new BadRequestException("Tài khoản hoặc mât khẩu không đúng");
        const checkPassword = bcrypt.compareSync(mat_khau, user.mat_khau);
        if(!checkPassword) throw new BadRequestException("Tài khoản hoặc mât khẩu không đúng");
        
        const token = tokenService.createToken(user.id)
        return token;


    }
}


export default authServices