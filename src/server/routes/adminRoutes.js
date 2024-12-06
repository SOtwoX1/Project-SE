import { Router } from 'express';
import { getDataProfile, getDataUser, getDataRestaurant, postDataRestaurant, deleteRestaurant } from '../services/adminService.js';

const router = Router();

// Get data `Profile` all user
router.get('/get-data-profile', getDataProfile);

// Get data `User` all user
router.get('/get-data-user', getDataUser);

// Get data `Restaurant` all user
router.get('/get-data-restaurant', getDataRestaurant);

// Post data restaurant
router.post('/post-data-restaurant', postDataRestaurant);

// Delete restaurant
router.delete('/delete-restaurant', deleteRestaurant);

export default router;