import { messageRepository } from "../repositories/message.repository.js"

export const getMessages=async (req,res)=>{
    const {id}=req.params//conversationid
    const user=req.user._id
    //find conversation

    //find messages
    const messaages=await messageRepository.findByConversation(id)
console.log(messaages)
  return  res.status(200).json({
        success:true,
        data:messaages
    })
}