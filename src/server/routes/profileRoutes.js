import { Router } from 'express';
import { changeStatus, getUserProfile, updateSwipe, setGenderInterest, registerProfile, uploadPhoto, setPhoto, getDataProfile, updateDataProfile, setUserPremiumStatus } from '../services/profileService.js';

const router = Router();
// router = /api/profile
// Get user profile
router.get('/get-profile/:userID', getUserProfile);

// Update swipe daily count
router.put('/update-swipe-profile/:userID', updateSwipe);

// Change status to free or not free for matching
router.put('/change-status/:userID', changeStatus);

// Set gernder interest use by username from users = userid from profiles
router.put('/set-gender/:username', setGenderInterest);

// Register profile endpotin
router.post('/register/profile', registerProfile);

// Upload photo
router.post('/upload-photo', uploadPhoto);

// Update user photos
router.put('/set-photo', setPhoto);

// Get data profile by username
router.get('/get-data', getDataProfile);

// Update data profile
router.put('/update-dataprofile', updateDataProfile);

// Update user premium status
router.put('/set-ispremium', setUserPremiumStatus);

export default router;
