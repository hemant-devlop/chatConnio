import mongoose from "mongoose";
import { conversationRepository } from "../repositories/conversation.repository.js";

class Conversation{
    async newConversation(userId,otherUserId){
         const conversationId = await conversationRepository.findByUsers(userId,otherUserId)
            if (!conversationId) {
                const newConversation=await conversationRepository.create(userId,otherUserId)
                return newConversation._id;
            }else{
                return conversationId._id;
            }
    }
    async allConversations(userId){
            const conversations=await conversationRepository.findAll(userId)
            return conversations??[]
    }
    async conversationUser(conversationId){
            const conversations=await conversationRepository.findById(conversationId)
            return conversations;
    }
}
export const conversationService=new Conversation();