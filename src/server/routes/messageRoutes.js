import { Router } from 'express';
import { getAllChatRoom, getChatHistory, sendMessage } from '../services/messageService.js';

const router = Router();
// router = /api/message
// Get all chat rooms
router.get('/get-all-chat/:userID', getAllChatRoom);

// Get chat history
router.get('/get-chat/:userID', getChatHistory);

// Send a message
router.post('/send-message/:userID', sendMessage);

export default router;