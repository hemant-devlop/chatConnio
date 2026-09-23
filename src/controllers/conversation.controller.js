import mongoose from "mongoose";
import { conversationRepository } from "../repositories/conversation.repository.js";
import { conversationService } from "../services/conversation.service.js";


export const conversations = async (req, res) => {
    const user = req.user;

    const conversations=await conversationService.allConversations(user._id)

    return res.json({
        success: true,
        data: conversations
    })
}
export const newconversation = async (req, res) => {
    const {userId} = req.params;
    const user = req.user;
    if (!user) {
        return res.json({
            success: false,
            data: "un authorised access"
        })
    }
     if (user._id === userId) {
        return res.json({
            success: false,
            data: "you cant message to yourself"
        })
    }

    const conversationId = await conversationService.newConversation(user._id,userId)

    return res.json({
        success: true,
        data: {conversationId }
    })
}

export const conversation = async (req, res) => {
    return res.json({
        success: true,
        data: ['helo', 'hii']
    })
}