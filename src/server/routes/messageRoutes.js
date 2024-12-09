import { Router } from 'express';
import { getAllChatRoom, getChatHistory, sendMessage } from '../services/messageService.js';
import { send } from 'vite';

const router = Router();

export const baseMessageRouteURL = '/api/message';

// Get all chat rooms
export const getAllChatRoomAPI = '/get-all-chat';
router.get(getAllChatRoomAPI + '/:userID', getAllChatRoom);

// Get chat history
export const getChatHistoryAPI = '/get-chat';
router.get(getChatHistoryAPI + '/:userID', getChatHistory);

// Send a message
export const endMessageRequestAPI = '/send-message';
router.post(endMessageRequestAPI + '/:userID', sendMessage);

export default router;