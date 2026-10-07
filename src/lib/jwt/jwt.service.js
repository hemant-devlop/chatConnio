import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import config from '../../config/index.js'
import ApiError from '../../error/errorHelper.js'
class JwtService {
   async generateAccessToken({userId, role, sessionId}) {
        const options = {
            expiresIn: config.auth.accessExpireIn,
            algorithm: "HS256",
            issuer: 'my-api-service',
        }
        return jwt.sign({ sub: userId, sid: sessionId, jti: crypto.randomUUID(), role, type: 'access' }, config.auth.accessTokenSecret, options)
    }

    async generateRefreshToken({userId,sessionId}){
        const options={
            expiresIn:config.auth.refreshExpireIn,
            algorithm:'HS256'
        }
        return jwt.sign({sub:userId,sid:sessionId,jti:crypto.randomUUID(),type:'refresh'},config.auth.refreshTokenSecret,options)

    }

   async verifyAccessToken(token){
        try{
            return jwt.verify(token,config.auth.accessTokenSecret)
        }catch(error){
            throw new ApiError(401,'invalid access token')
        }
    }
   async verifyRefreshToken(token){
        try{
            return jwt.verify(token,config.auth.refreshTokenSecret)
        }catch(error){
            throw new ApiError(401,'invalid refresh token')
        }
    }
   async decodeToken(token){
        return jwt.decode(token)
    }
    getRefreshExpiry(){
        return config.auth.refreshExpireIn;
    }

}

export const jwtService = new JwtService()