export const createDatabaseConfig = (env) => {
    return Object.freeze({
        db_uri: env.DB_URI,
        db_name: env.DB_NAME,
        db_retry: env.DB_RETRY_LIMIT,
        db_delay: env.DB_RETRY_DELAY
    })
}