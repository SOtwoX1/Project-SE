import { Router } from 'express';
import { changeStatus, getUserProfile, updateSwipe, setGenderInterest, registerProfile, setPhoto, getDataProfile, updateDataProfile, setUserPremiumStatus } from '../services/profileService.js';

const router = Router();

export const baseProfileRouteURL = '/api/profile';

// Get user profile
export const getUserProfileAPI = '/get-profile';
router.get(getUserProfileAPI + '/:userID', getUserProfile);

// Update swipe daily count
export const updateSwipeAPI = '/update-swipe-profile';
router.put(updateSwipeAPI + '/:userID', updateSwipe);

// Change status to free or not free for matching
export const changeStatusAPI = '/change-status';
router.put(changeStatusAPI + '/:userID', changeStatus);

// Set gernder interest use by username from users = userid from profiles
export const setGenderInterestAPI = '/set-gender';
router.put(setGenderInterestAPI + '/:username', setGenderInterest);

// Register profile endpotin
export const registerProfileAPI = '/register/profile';
router.post(registerProfileAPI, registerProfile);

// Update user photos
export const setPhotoAPI = '/set-photo';
router.put(setPhotoAPI, setPhoto);

// Get data profile by username
export const getDataProfileAPI = '/get-data';
router.get(getDataProfileAPI, getDataProfile);

// Update data profile
export const updateDataProfileAPI = '/update-dataprofile';
router.put(updateDataProfileAPI, updateDataProfile);

// Update user premium status
export const setUserPremiumStatusAPI = '/set-ispremium';
router.put(setUserPremiumStatusAPI, setUserPremiumStatus);

export default router;
