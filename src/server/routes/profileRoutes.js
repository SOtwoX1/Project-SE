import { Router } from 'express';
import { changeStatus, getUserProfile, updateSwipe, setGenderInterest, registerProfile, setPhoto, getDataProfile, updateDataProfile, setUserPremiumStatus } from '../services/profileService.js';
import { profileRoutesURL } from '../../apiConfig.js';

const router = Router();

// Get user profile
router.get(profileRoutesURL.getUserProfileAPI + '/:userID', getUserProfile);

// Update swipe daily count
router.put(profileRoutesURL.updateSwipeAPI + '/:userID', updateSwipe);

// Change status to free or not free for matching
router.put(profileRoutesURL.changeStatusAPI + '/:userID', changeStatus);

// Set gernder interest use by username from users = userid from profiles
router.put(profileRoutesURL.setGenderInterestAPI + '/:username', setGenderInterest);

// Register profile endpotin
router.post(profileRoutesURL.registerProfileAPI, registerProfile);

// Update user photos
router.put(profileRoutesURL.setPhotoAPI, setPhoto);

// Get data profile by username
router.get(profileRoutesURL.getDataProfileAPI, getDataProfile);

// Update data profile
router.put(profileRoutesURL.updateDataProfileAPI, updateDataProfile);

// Update user premium status
router.put(profileRoutesURL.setUserPremiumStatusAPI, setUserPremiumStatus);

export default router;
