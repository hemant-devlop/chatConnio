import cookieConfig from "./cookie.config.js"
class CookieServie {
    // setAccessToken(res, token) {
    //     res.cookie('accessToken', token, cookieConfig.accessToken)
    // }
    // clearAccessToken(res) {
    //     res.clearCookie('accessToken',cookieConfig.accessToken)
    // }
    setRefresehToken(res, token) {
        res.cookie('refreshToken', token, cookieConfig.refreshToken)
    }
    clearRefresehToken(res) {
        res.clearCookie('refreshToken', cookieConfig.refreshToken)
    }
}

export const cookieServie = new CookieServie()