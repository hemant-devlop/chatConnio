import { Server } from 'socket.io'
import { socketAuth } from '../middlewares/socket.middleware.js'
import config from '../config/index.js'
import { userRepository } from '../repositories/user.repository.js';
import { conversationRepository } from '../repositories/conversation.repository.js';
import ApiError from '../error/errorHelper.js';
import { messageRepository } from '../repositories/message.repository.js';
import mongoose from 'mongoose';


export function initializeSocket(server) {
    const io = new Server(server, {
        cors: config.security.cors
    })

    io.use(socketAuth);

    io.on('connection', (socket) => {
        // console.log("socket",socket.user)
        const user = socket.user

        socket.on("join-conversation", async ({ conversationId }) => {
            if (!mongoose.isValidObjectId(conversationId)) {
                return socket.emit("socket-error", {
                    message: "room:not a valid conversation id"
                })
            }
            const conversation = await conversationRepository.findByIdAndParticipants(conversationId, user.id)
            if (!conversation) {
                return socket.emit("socket-error", {
                    message: "you are not member of this conversation"
                })
            }
            socket.join(conversationId)
        })

        socket.on("send-message", async ({ text, conversationId, clientMessageId }) => {
            if (!mongoose.isValidObjectId(conversationId)) {
                return socket.emit("socket-error", {
                    message: "chat: not a valid conversation id"
                })
            }
            const newMessage = await messageRepository.create(conversationId, user.id, text, clientMessageId)
            const updatedConversation = await conversationRepository.updateLastMessage(conversationId, newMessage._id)
            io.to(conversationId).emit("new-message", { conversationId, newMessage })
        })
        // console.log(`user ${userId} connected`)
        // console.log(`socketId ${socket.id} connected`)

        socket.join(`user:${user.id}`);
        socket.on('disconnect', (reason) => {
            console.log(`user ${user.id} disconnected`)
            console.log("reason", reason)
        })
    })

    return io;
}