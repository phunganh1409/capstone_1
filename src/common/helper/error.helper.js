import jwt from "jsonwebtoken";
import { responseError } from "./response.helper";
import { ForbiddenException, UnAuthorizad } from "./exception.helper";

export const handleError = (err, req, res, next) => {
    console.log(err);

    let statusCode = err.statusCode || 500
    if(err instanceof jwt.JsonWebTokenError){
        statusCode = (new UnAuthorizad()).statusCode
        
    }
    if(err instanceof jwt.TokenExpiredError){
        statusCode = (new ForbiddenException).statusCode
    }
    const response = responseError(err.message, statusCode, err.stack);

    res.status(response.statusCode).json(response);

}