import {z} from 'zod'
export const envSchmea=z.object({
PORT:z.coerce.number().int().min(1).max(65565),

CLIENT_URL:z.url(),

DB_URI:z.string().trim().min(1),

DB_NAME:z.string().trim().min(1),
DB_RETRY_LIMIT:z.coerce.number().int().min(1),
DB_RETRY_DELAY:z.coerce.number().int().min(1000),

JWT_ACCESS_SECRET:z.string().min(32),
JWT_REFRESH_SECRET:z.string().min(32),

JWT_ACCESS_EXPIRES_IN:z.string(),
JWT_REFRESH_EXPIRES_IN:z.string(),

NODE_ENV:z.enum(["dev","prod","test"]),

COOKIE_SECURE:z.coerce.boolean(),

COOKIE_HTTP_ONLY:z.coerce.boolean(),

COOKIE_SAME_SITE:z.enum(["lax","strict",'none']),

 BCRYPT_ROUNDS:z.coerce.number().int().min(10).max(15),
})
    