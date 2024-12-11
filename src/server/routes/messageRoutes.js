import { Router } from 'express';
import { getAllChatRoom, getChatHistory, sendMessage } from '../services/messageService.js';
import { messageRoutesURL } from '../../apiConfig.js';

const router = Router();

// Get all chat rooms
router.get(messageRoutesURL.getAllChatRoomAPI + '/:userID', getAllChatRoom);

// Get chat history
router.get(messageRoutesURL.getChatHistoryAPI + '/:userID', getChatHistory);

// Send a message
router.post(messageRoutesURL.endMessageRequestAPI + '/:userID', sendMessage);

export default router;