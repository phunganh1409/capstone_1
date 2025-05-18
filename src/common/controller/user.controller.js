
import userService from "../../services/user.services"
import { reponseSuccess } from "../helper/response.helper"

const userController = {
    getUser: async (req,res, next) => {
        try {
        const result = await userService.getUser(req)
        const response = reponseSuccess(result,"Tải thông tin user thành công")
        res.status(response.statusCode).json(response)
            
        } catch (error) {
            next(error)
        }

    },
    getSaveUser: async( req,res,next ) =>{
        try {
           const result = await userService.getSaveUser(req)
         const response =  reponseSuccess(result, "Lấy thông ảnh đã lưu theo User thành công")
          res.status(response.statusCode).json(response)
        } catch (error) {
            next(error)
        }
    },
    getCreateImage: async (req,res,next) =>{
        try {
            const result = await userService.getCreateImage(req)
            const response = reponseSuccess(result, "Lấy thông tin ảnh đã tạo theo User thành công")
            res.status(response.statusCode).json(response)
        } catch (error) {
            next(error)
        }
    },
     deleteImage: async (req, res, next) =>{
        try {
          const result = await userService.deleteImage(req)
          const response  = reponseSuccess(result, "Đã xóa ảnh thành công")
          res.status(response.statusCode).json(response)
        } catch (error) {
          next(error)
          
        }
      },
      createImage:async (req, res, next) =>{
        try {
            const result = await userService.createImage(req);
            const response = reponseSuccess(result, "Tạo ảnh thành công")
            res.status(response.statusCode).json(response)
        } catch (error) {
            next(error)
            
        }
      },
      createInfo:async (req, res, next) =>{
        try {
            const result = await userService.createInfo(req)
            const response = reponseSuccess(result, "Cập nhật User thành công")
            res.status(response.statusCode).json(response)
        } catch (error) {
            next(error)
        }
      }
}

export default userController