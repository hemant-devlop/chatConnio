import { mongoose } from "./database.connection.js";
export function registerMongooseEvents(){
    mongoose.connection.on('connected',()=>{
        console.log('mongodb is connected')
    })
    mongoose.connection.on('disconnected',()=>{
        console.log('mongodb is disconnected')
    })
    mongoose.connection.on('reconnected',()=>{
        console.log('mongodb is reconnected')
    })
    mongoose.connection.on('error',(error)=>{
        console.error('mongo error',error)
    })
}