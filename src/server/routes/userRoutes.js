import { Router } from 'express';


const router = Router();

// Register
router.post('/register', register);

// Login
router.post('/login', login);

// Fotget Password
router.post('/forgot-password', forgotPassword);

// Set password
router.put('/api/reset-password', setPassword);

// Reset password
router.put('/api/setting/reset-password', resetPassword);

// Create cardpayment
router.post('/api/create-cardpayment', createCardPayment);

// Delete account
router.delete('/api/delete-account', deleteAccount);

export default router;