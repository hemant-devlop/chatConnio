export const createSecurityConfig = (env) => {

    return Object.freeze({

        bcryptRounds: env.BCRYPT_ROUNDS,
        trustProxy: false,
        cors: {
            origin: env.CLIENT_URL,
            credentials: true,
        }

    });

};