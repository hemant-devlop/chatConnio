import config from "../../config/index.js"
import cookieConfig from "./cookie.config.js"
class CookieServie {
    // setAccessToken(res, token) {
    //     res.cookie('accessToken', token, cookieConfig.accessToken)
    // }
    setRefresehToken(res, token) {
        res.cookie('refreshToken', token, cookieConfig.refreshToken)
    }
    clearAccessToken(res) {
        res.clearCookie('accessToken',cookieConfig.accessToken)
    }
    clearRefresehToken(res) {
        res.clearCookie('refreshToken',cookieConfig.refreshToken)
    }
}

export const cookieServie = new CookieServie()