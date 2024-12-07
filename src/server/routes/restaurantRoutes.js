import { Router } from 'express';
import { getAllChillingAt, getAllRestaurant, getRestaurantByID, postChillingAt, postChillingWithYou } from '../services/restaurantService.js';

const router = Router();
// router = /api/restaurant
// Get all restaurants
router.get('/get-all-restaurants', getAllRestaurant);

// Get restaurant by restaurantID
router.get('/get-restaurant/:restaurantID', getRestaurantByID);

// Get all who that chilling at restaurant
router.get('/get-all-chilling/:restaurantID', getAllChillingAt);

// Post new chilling at restaurant
router.post('/chilling-at/:restaurantID', postChillingAt);

// Request chilling with another user
router.post('/chilling-with-you/:userID', postChillingWithYou);

export default router;