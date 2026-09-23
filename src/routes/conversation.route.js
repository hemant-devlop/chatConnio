import express from 'express'
import { conversation, conversations, newconversation } from '../controllers/conversation.controller.js';
import protect from '../middlewares/auth.middleware.js';
import { getMessages } from '../controllers/messages.controller.js';

const router=express.Router();

router.get('/conversations',protect,conversations)//all conversations of this user
router.get('/new-conversation/:userId',protect,newconversation)//start conversation with new conn id
router.get('/conversation/:id',protect,getMessages)//messaages all fetch

export default router;