import express from 'express'
import protect from '../middlewares/auth.middleware.js';
import { login, logout, refresh, register } from '../controllers/auth.controller.js';
const router = express.Router();

router.post('/refresh',refresh)
router.post('/logout',protect,logout)
router.post('/login',login);
router.post('/register', register)

export default router;