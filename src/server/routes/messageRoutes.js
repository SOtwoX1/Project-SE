import { Router } from 'express';
import { getAllChatRoom, getChatHistory, sendMessage } from '../services/messageService.js';

const router = Router();

// Get all chat rooms
router.get('/get-all-chat/:userID', getAllChatRoom);

// Get chat history
router.get('/get-chat/:userID', getChatHistory);

// Send a message
router.post('/send-message/:userUD', sendMessage);

export default router;