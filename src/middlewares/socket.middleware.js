import ApiError from "../error/errorHelper.js";
import { jwtService } from "../lib/jwt/jwt.service.js";

export function socketAuth(socket,next){
    try{
        const token=socket.handshake.auth?.token;

        if(!token){
            return next(new ApiError(401,'auth required'))
        }
        const decode = jwtService.verifyAccessToken(token)
        if(decode.type!=='access'){
            return next(new ApiError(401,'INVALID_ACCESS_TOKEN'))
        }
        socket.user={
            id:decode.sub,
            role:decode.role,
            sessionId:decode.sid
        }
        next();
    }catch(error){
        console.error('socket authentication faild',error.messgage)

        next(new ApiError(401,'INVALID_ACCESS_TOKEN'))
    }
}