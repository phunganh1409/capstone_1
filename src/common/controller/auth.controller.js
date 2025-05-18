import authServices from "../../services/auth.services"
import { reponseSuccess } from "../helper/response.helper"



const authController = {
     register : async ( req, res, next)=> {
      try {
        const result = await authServices.register(req);
        
        const response = reponseSuccess(result, "Đăng ký thành công");
        res.status(response.statusCode).json(response)
      } catch (error) {

        next(error)
        
      }
    },
    login:async (req, res, next)=>{
      try {
        const result = await authServices.login(req);
        const response = reponseSuccess(result, "Đăng nhập thành công");
        res.status(response.statusCode).json(response);
      } catch (error) {
        next(error)
        
      }

    }
}

export default authController