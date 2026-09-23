export const createLoggerConfig=(env)=>{
     return Object.freeze({
        level:env.LOG_LEVEL,
    });
}