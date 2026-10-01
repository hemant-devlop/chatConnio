import mongoose from "mongoose"
import ApiError from "../error/errorHelper.js"
import { messageRepository } from "../repositories/message.repository.js"

export const getMessages = async (req, res) => {
    try {
        const { id } = req.params//conversationid
        //find conversation
        if (!mongoose.isValidObjectId(id)) {
             return res.status(400).json({
            success: false,
            message:"invalid id",
            data: null
        })
        }
        //find messages
        const messaages = await messageRepository.findByConversation(id)
        return res.status(200).json({
            success: true,
            data: messaages
        })
    } catch (error) {
        return new ApiError(500, "error while get message", error)
    }
}