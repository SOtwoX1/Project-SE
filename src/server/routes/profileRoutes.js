import { Router } from 'express';
import { changeStatus, getUserProfile, updateSwipe } from '../services/profileService.js';
const router = Router();

// Get user profile
router.get('/get-profile/:userID', getUserProfile);

// Update swipe daily count
router.put('/update-swipe-profile/:userID', updateSwipe);

// Change status to free or not free for matching
router.put('/change-status/:userID', changeStatus);

export default router;
