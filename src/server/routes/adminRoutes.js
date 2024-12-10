import { Router } from 'express';
import { getDataProfile, getDataUser, getDataRestaurant, postDataRestaurant, deleteRestaurant } from '../services/adminService.js';
import { adminRoutesURL } from '../../apiConfig.js';

const router = Router();

// Get data `Profile` all user
router.get(adminRoutesURL.getDataProfileAdminAPI, getDataProfile);

// Get data `User` all user
router.get(adminRoutesURL.getDataUserAPI, getDataUser);

// Get data `Restaurant` all user
router.get(adminRoutesURL.getDataRestaurantAPI, getDataRestaurant);

// Post data restaurant
router.post(adminRoutesURL.postDataRestaurantAPI, postDataRestaurant);

// Delete restaurant
router.delete(adminRoutesURL.deleteRestaurantAPI, deleteRestaurant);

export default router;