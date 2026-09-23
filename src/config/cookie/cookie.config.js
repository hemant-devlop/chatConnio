export const createCookieConfig = (env) => {
    return Object.freeze({
        secure: env.COOKIE_SECURE,
        httpOnly: env.COOKIE_HTTP_ONLY,
        sameSite: env.COOKIE_SAME_SITE,
        path:"/",
        accessMaxAge: 15 * 60 * 1000,
        refreshMaxAge: 30 * 24 * 60 * 60 * 1000
    })
}