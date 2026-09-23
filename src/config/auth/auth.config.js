export const createAuthConfig=(env)=>{
    return Object.freeze({
        accessTokenSecret:env.JWT_ACCESS_SECRET,
        refreshTokenSecret:env.JWT_REFRESH_SECRET,
        accessExpireIn:env.JWT_ACCESS_EXPIRES_IN,
        refreshExpireIn:env.JWT_REFRESH_EXPIRES_IN
    })
}