export const createAppConfig = (env) => {
    return Object.freeze({
        env: env.NODE_ENV,
        port: env.PORT,
        clientUrl: env.CLIENT_URL,
        isDevelopment: env.NODE_ENV === "dev",
        isProduction: env.NODE_ENV === "prod",
        isTest: env.NODE_ENV === "test",
    })
}