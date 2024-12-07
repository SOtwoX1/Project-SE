import { Router } from 'express';
import { register, login, forgotPassword, setPassword, resetPassword, createCardPayment, deleteAccount } from '../services/userService.js';

const router = Router();

// Register
router.post('/register', register);

// Login
router.post('/login', login);

// Fotget Password
router.post('/forgot-password', forgotPassword);

// Set password
router.put('/reset-password', setPassword);

// Reset password
router.put('/setting/reset-password', resetPassword);

// Create cardpayment
router.post('/create-cardpayment', createCardPayment);

// Delete account
router.delete('/delete-account', deleteAccount);

export default router;