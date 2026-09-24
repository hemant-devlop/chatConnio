import express from 'express'
import protect from '../middlewares/auth.middleware.js';
import { findUserByUsername, getMe, getUser } from '../controllers/user.controller.js';

const router=express.Router();


router.get('/',protect,findUserByUsername);
router.get('/me',protect,getMe)
router.get('/:userId',protect,getUser);
export default router;