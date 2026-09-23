import mongoose from 'mongoose'
import config from '../../config/index.js'
import { databaseOptions } from './database.config.js'

export const connectDb= async()=>{
    return mongoose.connect(config.database.db_uri,databaseOptions)
}
export const disconnectDb=async()=>{
   return mongoose.disconnect()
}

export {mongoose};