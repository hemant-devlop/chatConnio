import mongoose from "mongoose";

const sessionSchema=new mongoose.Schema({
    _id:{type:mongoose.Schema.Types.ObjectId,required:true},
    userId:{ type:mongoose.Schema.Types.ObjectId, ref:'User', required:true, index:true},
    jti:{type:String,required:true,select:false},
    refreshTokenHash:{  type:String,  required:true},
    expiresAt:{ type:Date, required:true },
    revokedAt:{ type:Date, default:null},
},{timestamps:true})

export const Session=mongoose.model('Session',sessionSchema);