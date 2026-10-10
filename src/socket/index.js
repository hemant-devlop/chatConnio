import { Server } from 'socket.io'
import { socketAuth } from '../middlewares/socket.middleware.js'
import config from '../config/index.js'
import { userRepository } from '../repositories/user.repository.js';
import { conversationRepository } from '../repositories/conversation.repository.js';
import ApiError from '../error/errorHelper.js';
import { messageRepository } from '../repositories/message.repository.js';
import mongoose from 'mongoose';
import redis from '../lib/radis/radis.js';


export function initializeSocket(server) {
    const io = new Server(server, {
        cors: config.security.cors
    })

    io.use(socketAuth);

    io.on('connection', async (socket) => {
        // console.log("socket",socket.user)
        const user = socket.user
        socket.on("typing:start", async ({ conversationId }) => {
            const conversation = await conversationRepository.findByIdAndParticipants(conversationId, user.id)
            if (!conversation) {
                return socket.emit("socket-error", {
                    message: "you are not member of this conversation"
                })
            }
            socket.to(conversationId).emit("typing:start", { userId: user.id })
        })

        socket.on("user:offline", async ({ userId, conversationId }) => {
            await redis.srem("online:users", userId);
            socket.join(conversationId)
            const allOnlineUser = await redis.smembers("online:users")
            // const onlineUserExceptme = allOnlineUser.filter(userId => userId !== user.id)
            // io.emit("user:online", { onlineUser: onlineUserExceptme })
            socket.to(conversationId).emit("user:offline", { onlineUser:allOnlineUser, conversationId })
        })

        socket.on("typing:stop", async ({ conversationId }) => {
            const conversation = await conversationRepository.findByIdAndParticipants(conversationId, user.id)
            if (!conversation) {
                return socket.emit("socket-error", {
                    message: "you are not member of this conversation"
                })
            }
            socket.to(conversationId).emit("typing:stop", { userId: user.id })
        })

        socket.on("join-conversation", async ({ conversationId }) => {
            if (!mongoose.isValidObjectId(conversationId)) {
                return socket.emit("socket-error", {
                    message: "room:not a valid conversation id"
                })
            }
            await redis.sadd("online:users", user.id)

            const allOnlineUser = await redis.smembers("online:users")
            const onlineUserExceptme = allOnlineUser.filter(userId => userId !== user.id)
            socket.emit("user:online", { conversationId, onlineUser: onlineUserExceptme })

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

        socket.join(`user:${user.id}`);
        socket.on('disconnect', async (reason) => {
            await redis.srem("online:users", user.id)

            console.log(`user ${user.id} disconnected`)
            console.log("reason", reason)
        })
    })

    return io;
}