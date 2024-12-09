import { Router } from 'express';
import { register, login, forgotPassword, setPassword, resetPassword, createCardPayment, deleteAccount } from '../services/userService.js';

const router = Router();

export const baseUserRouteURL = '/api/user/';

// Register
export const registerAPI = '/register';
router.post(registerAPI, register);

// Login
export const loginAPI = '/login';
router.post(loginAPI, login);

// Fotget Password
export const forgotPasswordAPI = '/forgot-password';
router.post(forgotPasswordAPI, forgotPassword);

// Set password
export const setPasswordAPI = '/reset-password';
router.put(setPasswordAPI, setPassword);

// Reset password
export const resetPasswordAPI = '/setting/reset-password';
router.put(resetPasswordAPI, resetPassword);

// Create cardpayment
export const createCardPaymentAPI = '/create-cardpayment';
router.post(createCardPaymentAPI, createCardPayment);

// Delete account
export const deleteAccountAPI = '/delete-account';
router.delete(deleteAccountAPI, deleteAccount);

export default router;