export const createSecurityConfig = (env) => {

    return Object.freeze({

        bcryptRounds: env.BCRYPT_ROUNDS,
        trustProxy: false,
        cors: {
            origin: env.CLIENT_URL,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization'],
            credentials: true,
        }

    });

};