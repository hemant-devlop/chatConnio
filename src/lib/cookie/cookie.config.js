import config from "../../config/index.js";
const cookieConfig = {
    accessToken: {
        httpOnly: config.cookie.secure,
        secure: config.cookie.secure,
        sameSite: config.cookie.sameSite,
        maxAge: config.cookie.accessMaxAge
    },
    refreshToken: {
        httpOnly: config.cookie.secure,
        secure: config.cookie.secure,
        sameSite: config.cookie.sameSite,
        path:config.cookie.path,
        maxAge:config.cookie.refreshMaxAge
    }
}

export default cookieConfig;