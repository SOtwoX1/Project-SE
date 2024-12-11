import { Router } from 'express';
import { getAllChillingAt, getAllRestaurant, getRestaurantByID, postChillingAt, postChillingWithYou } from '../services/restaurantService.js';
import { restaurantRoutesURL } from '../../apiConfig.js';

const router = Router();

// Get all restaurants
router.get(restaurantRoutesURL.getAllRestaurantAPI, getAllRestaurant);

// Get restaurant by restaurantID
router.get(restaurantRoutesURL.getRestaurantByIDAPI + '/:restaurantID', getRestaurantByID);

// Get all who that chilling at restaurant
router.get(restaurantRoutesURL.getAllChillingAtAPI + '/:restaurantID', getAllChillingAt);

// Post new chilling at restaurant
router.post(restaurantRoutesURL.postChillingAtAPI + '/:restaurantID', postChillingAt);

// Request chilling with another user
router.post(restaurantRoutesURL.postChillingWithYouAPI + '/:userID', postChillingWithYou);

export default router;