import { deepFreez } from "../shared/utils/deepFreez.js";
import { createAppConfig } from "./app/app.config.js";
import { createAuthConfig } from "./auth/auth.config.js";
import { createCookieConfig } from "./cookie/cookie.config.js";
import { createDatabaseConfig } from "./database/database.config.js";

import { createLoggerConfig } from "./logger/logger.config.js";
import { createSecurityConfig } from "./security/security.config.js";
import env from './env/env.js'
const config=deepFreez({
    app:createAppConfig(env),
    auth:createAuthConfig(env),
    cookie:createCookieConfig(env),
    security:createSecurityConfig(env),
    database:createDatabaseConfig(env),
    logger:createLoggerConfig(env)
})

export default config;