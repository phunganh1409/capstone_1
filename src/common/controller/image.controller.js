
import imageServices from "../../services/image.services"
import { reponseSuccess } from "../helper/response.helper";

const ImageController = {
    getImage: async (req,res,next)=>{
        try {
           const result = await imageServices.getImage(req);
           const response = reponseSuccess(result, "Lấy ảnh thành công");
           res.status(response.statusCode).json(response)
        } catch (error) {
            next(error)
            
        }
        
    },
    searchImage: async (req,res,next)=>{
        try {
            const result = await imageServices.searchImage(req)
            const response = reponseSuccess(result, "Tìm kiếm ảnh thành công")
            res.status(response.statusCode).json(response)
        } catch (error) {
            next(error)
            
        }
    },
      getImageById: async (req,res,next)=>{
        try {
            const result = await imageServices.getImageById(req)
            const response = reponseSuccess(result, "Tìm kiếm thông tin ảnh thành công")
            res.status(response.statusCode).json(response)
        } catch (error) {
            next(error)
            
        } 
      },
      commentById: async (req,res,next) =>{
        try {
          const result = await imageServices.commentById(req)
          const response = reponseSuccess(result, "Tìm kiếm thông tin bình luận thành công")
          res.status(response.statusCode).json(response)
        } catch (error) {
            next(error)
          
        }
      },
      checkImageSave : async (req,res,next) =>{
        try {
          const result = await imageServices.checkImageSave(req)
          const response = reponseSuccess(result, "Kiểm tra ảnh đã lưu thành công")
          res.status(response.statusCode).json(response)
        } catch (error) {
            next(error)
          
        }
      },
      createComment: async (req, res, next)=>{
        try {
          const result = await imageServices.createComment(req)
          const response = reponseSuccess(result, "Tạo bình luận thành công")
          res.status(response.statusCode).json(response)
        } catch (error) {
            next(error)
          
        }

      },
     
}



export default ImageController