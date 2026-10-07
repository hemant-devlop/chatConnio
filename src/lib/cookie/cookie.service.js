import cookieConfig from "./cookie.config.js"
class CookieServie {
    // setAccessToken(res, token) {
    //     res.cookie('accessToken', token, cookieConfig.accessToken)
    // }
    // clearAccessToken(res) {
    //     res.clearCookie('accessToken',cookieConfig.accessToken)
    // }
   async setRefresehToken(res, token) {
        res.cookie('refreshToken', token, cookieConfig.refreshToken)
    }
   async clearRefresehToken(res) {
        res.clearCookie('refreshToken', cookieConfig.refreshToken)
    }
}

export const cookieServie = new CookieServie()