import express from 'express'
import protect from '../middlewares/auth.middleware.js';
import { getMessages } from '../controllers/messages.controller.js';

const router=express.Router();

router.get('/:conversation',protect,getMessages);

export default router;