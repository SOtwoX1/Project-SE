import { Router } from 'express';
import { register, login, forgotPassword, setPassword, resetPassword, createCardPayment, deleteAccount } from '../services/userService.js';
import { userRoutesURL } from '../../apiConfig.js';

const router = Router();

// Register
router.post(userRoutesURL.registerAPI, register);

// Login
router.post(userRoutesURL.loginAPI, login);

// Fotget Password
router.post(userRoutesURL.forgotPasswordAPI, forgotPassword);

// Set password
router.put(userRoutesURL.setPasswordAPI, setPassword);

// Reset password
router.put(userRoutesURL.resetPasswordAPI, resetPassword);

// Create cardpayment
router.post(userRoutesURL.createCardPaymentAPI, createCardPayment);

// Delete account
router.delete(userRoutesURL.deleteAccountAPI, deleteAccount);

export default router;