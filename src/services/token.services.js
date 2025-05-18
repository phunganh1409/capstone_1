import jwt from 'jsonwebtoken';
import { EXPRIRES_IN, TOKEN_SECRET } from '../common/constant/app.constant';

const tokenService = {
    createToken: (userId) =>{
            const  accessToken = jwt.sign({userId: userId},TOKEN_SECRET,{expiresIn: "1d"});

            return {accessToken}

    } 
        
    
};
export default tokenService;