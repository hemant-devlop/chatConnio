import { Conversation } from "../models/conversation.model.js";

class ConversationRepository {
    async findByUsers(userId,OtherUserId) {
        return Conversation.findOne({
            participants: { $all: [userId,OtherUserId], $size: 2 },
        });
    }
    async findById(conversationId) {
        return Conversation.findById(conversationId).lean();
    }
    async findAll(userId) {
        return Conversation.find({
            participants: { $all: [userId], $size: 2 },
        }).populate("lastMessage","content sender createdAt").populate("participants")
       // .populate('message','content')
    }
    async create(userId, OtherUserId,conversationId) {
        return Conversation.create({
            _id:conversationId,
            participants: [userId, OtherUserId],
        })
    }
    async updateLastMessage(conversationId,lastMessage) {
        return Conversation.findByIdAndUpdate(conversationId,{lastMessage:lastMessage},{new:true})
    }
}

export const conversationRepository = new ConversationRepository();
