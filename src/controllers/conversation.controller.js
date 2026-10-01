
import mongoose from "mongoose";
import { conversationService } from "../services/conversation.service.js";


export const conversations = async (req, res) => {
    const user = req.user;

    const conversations = await conversationService.allConversations(user._id)

    return res.json({
        success: true,
        data: conversations
    })
}
export const conversationUser = async (req, res) => {
    const { conversationId } = req.params;
 if (!mongoose.isValidObjectId(conversationId)) {
             return res.status(400).json({
            success: false,
            message:"invalid conversation Id",
            data: null
        })
        }
    const conversationUser = await conversationService.conversationUser(conversationId)
    if (!conversationUser) {
        return res.status(400).json({
            success: false,
            data: null
        })
    }
    return res.status(200).json({
        success: true,
        data: conversationUser
    })
}
export const newconversation = async (req, res) => {
    const { userId } = req.params;
    const user = req.user;
    if (!user) {
        return res.json({
            success: false,
            message: "un authorised access"
        })
    }
    if (user._id === userId) {
        return res.json({
            success: false,
            message: "you cant message to yourself"
        })
    }

    const conversationId = await conversationService.newConversation(user._id, userId)

    return res.json({
        success: true,
        data: { conversationId }
    })
}

export const conversation = async (req, res) => {
    return res.json({
        success: true,
        data: ['helo', 'hii']
    })
}