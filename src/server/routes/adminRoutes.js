import { Router } from 'express';
import { getDataProfile, getDataUser, getDataRestaurant, postDataRestaurant, deleteRestaurant } from '../services/adminService.js';

const router = Router();

export const baseAdminRouteURL = '/api/admin';

// Get data `Profile` all user
export const getDataProfileAPI = '/get-data-profile';
router.get(getDataProfileAPI, getDataProfile);

// Get data `User` all user
export const getDataUserAPI = '/get-data-user';
router.get(getDataUserAPI, getDataUser);

// Get data `Restaurant` all user
export const getDataRestaurantAPI = '/get-data-restaurant';
router.get(getDataRestaurantAPI, getDataRestaurant);

// Post data restaurant
export const postDataRestaurantAPI = '/post-data-restaurant'
router.post(postDataRestaurantAPI, postDataRestaurant);

// Delete restaurant
export const deleteRestaurantAPI = '/delete-restaurant';
router.delete(deleteRestaurantAPI, deleteRestaurant);

export default router;