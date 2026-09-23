import {Server} from 'socket.io'
import { socketAuth } from '../middlewares/socket.middleware.js'
import config from '../config/index.js'
import { userRepository } from '../repositories/user.repository.js';
import { conversationRepository } from '../repositories/conversation.repository.js';
import ApiError from '../error/errorHelper.js';
import { messageRepository } from '../repositories/message.repository.js';


export function initializeSocket(server){
        const io=new Server(server,{
            cors:config.security.cors
        })

        io.use(socketAuth);

        io.on('connection',(socket)=>{
            // console.log("socket",socket.user)
            const user=socket.user

            socket.on("join-connversation",async({conversationId})=>{
                socket.join(conversationId)
            })
            
            socket.on("send-message",async({text,userId,conversationId})=>{
                const userFind=await userRepository.findById(userId)
                let conversation;
                conversation=await conversationRepository.findById(conversationId)
                if(!conversation){
                    conversation=await conversationRepository.create(user.id,userId,conversationId)
                }
                const newMessage= await messageRepository.create(conversationId,user.id,text)
                const updatedConversation=await conversationRepository.updateLastMessage(conversationId,newMessage._id)
                console.log(updatedConversation)

              io.to(conversationId).emit("new-message",{conversationId,newMessage})
            })
            // console.log(`user ${userId} connected`)
            // console.log(`socketId ${socket.id} connected`)

            socket.join(`user:${user}`);

            socket.on('disconnect',(reason)=>{
                console.log(`user ${user} disconnected`)

                console.log("reason",reason)
            })
        })

        return io;
}