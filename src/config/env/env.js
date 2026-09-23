import dotenv from 'dotenv'
import { envSchmea } from './envSchema.js';
import { object } from 'zod';

dotenv.config()

const parsedEnv=envSchmea.safeParse(process.env);
if(!parsedEnv.success){
    console.error("environment validation faild");

     console.error(
        parsedEnv.error.format()
    )

    process.exit(1)
}

const env=Object.freeze(parsedEnv.data);

export default env;