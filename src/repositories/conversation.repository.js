import { Conversation } from "../models/conversation.model.js";

class ConversationRepository {
    async findByUsers(userId,OtherUserId) {
        return Conversation.findOne({
            participants: { $all: [userId,OtherUserId], $size: 2 },
        });
    }
    async findById(conversationId) {
        return Conversation.findById(conversationId).populate("participants").lean();
    }
    async findByIdAndParticipants(conversationId,participantId) {
        return Conversation.findOne({
            _id:conversationId,
            participants:participantId
        }).lean();
    }
    async findAll(userId) {
        return Conversation.find({
            participants: { $all: [userId], $size: 2 },
        }).populate("lastMessage","content sender createdAt").populate("participants")
       // .populate('message','content')
    }
    async create(userId, OtherUserId) {
        return Conversation.create({
            participants: [userId, OtherUserId]
        })
    }
    async updateLastMessage(conversationId,lastMessage) {
        return Conversation.findByIdAndUpdate(conversationId,{lastMessage:lastMessage},{returnDocument:'after'})
    }
}

export const conversationRepository = new ConversationRepository();
