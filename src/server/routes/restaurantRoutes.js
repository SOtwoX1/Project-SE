import { Router } from 'express';
import { getAllChillingAt, getAllRestaurant, getRestaurantByID, postChillingAt, postChillingWithYou } from '../services/restaurantService.js';

const router = Router();

export const baseRestaurantRouteURL = '/api/restaurant';

// Get all restaurants
export const getAllRestaurantAPI = '/get-all-restaurants';
router.get(getAllRestaurantAPI, getAllRestaurant);

// Get restaurant by restaurantID
export const getRestaurantByIDAPI = '/get-restaurant';
router.get(getRestaurantByIDAPI + '/:restaurantID', getRestaurantByID);

// Get all who that chilling at restaurant
export const getAllChillingAtAPI = '/get-all-chilling';
router.get(getAllChillingAtAPI + '/:restaurantID', getAllChillingAt);

// Post new chilling at restaurant
export const postChillingAtAPI = '/chilling-at';
router.post(postChillingAtAPI + '/:restaurantID', postChillingAt);

// Request chilling with another user
export const postChillingWithYouAPI = '/chilling-with-you';
router.post(postChillingWithYouAPI + '/:userID', postChillingWithYou);

export default router;