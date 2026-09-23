import mongoose from 'mongoose';
const userSchema=new mongoose.Schema({
    name:{type:String,required:true,trim:true,},
    username:{type:String,required:true,trim:true,},
    email:{type:String,required:true,lowercase:true,unique:true,trim:true},
    password:{type:String,required:true,select:false,},
    role:{type:String,default:'user',}

},{timestamps:true})

export const User=mongoose.model('User',userSchema)