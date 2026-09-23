import mongoose from "mongoose";
import { conversationRepository } from "../repositories/conversation.repository.js";

class Conversation{
    async newConversation(userId,otherUserId){
         const conversationId = await conversationRepository.findByUsers(userId,otherUserId)
         console.log(conversationId)
            if (!conversationId) {
                const newConversationId = new mongoose.Types.ObjectId()
                return newConversationId
            }else{
                return conversationId._id;
            }
    }
    async allConversations(userId){
            const conversations=await conversationRepository.findAll(userId)
            return conversations??[]
    }
}
export const conversationService=new Conversation();