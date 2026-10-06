import Redis from "ioredis"
import config from "../../config/index.js"
const redis= new Redis(config.database.redis_db)

redis.on("connect",()=>{
    console.log("Redis is connedted")
})
redis.on("error",(error)=>{
    console.log("Redis is error",error)
})

export default redis;