import cookieConfig from "./cookie.config.js"
class CookieServie {
    // setAccessToken(res, token) {
    //     res.cookie('accessToken', token, cookieConfig.accessToken)
    // }
    // clearAccessToken(res) {
    //     res.clearCookie('accessToken',cookieConfig.accessToken)
    // }
    async setRefresehToken(res, token) {
        //    return res.cookie('refreshToken', token, cookieConfig.refreshToken)
        return res.cookie('refreshToken', token, {
            httpOnly: true,              // Blocks JavaScript (protects against XSS)
            secure: true,        // Requires HTTPS in production
            sameSite: none, // 'none' for cross-site with credentials, 'lax' for same-site
            path: '/api/auth/refresh',   // Restrict cookie transmission to the refresh endpoint only
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
        });
    }
    async clearRefresehToken(res) {
        return res.clearCookie('refreshToken',{
            httpOnly: true,              // Blocks JavaScript (protects against XSS)
            secure: true,        // Requires HTTPS in production
            sameSite: none, // 'none' for cross-site with credentials, 'lax' for same-site
            path: '/api/auth/refresh',   // Restrict cookie transmission to the refresh endpoint only
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
        })
    }
}

export const cookieServie = new CookieServie()