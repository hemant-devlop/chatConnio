import { Message } from "../models/message.model.js";
class MessageRepository{
    async create(conversation,sender,content,clientMessageId) {
        return Message.create({conversation,sender,content,clientMessageId});
    }

    async findById(messageId) {
        return Message.findById(messageId).lean();
    }
    async findByConversation(conversation) {
        return Message.find({conversation}).sort({createdAt:1});
    }

}

export const messageRepository = new MessageRepository();