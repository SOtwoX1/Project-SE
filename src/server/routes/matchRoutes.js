import { Router } from 'express';
import { acceptMatchRequest, declineMatchRequest, getAllMatchRequest, getMatchProfile, sendMatchRequest } from '../services/matchService.js';
import { get } from 'mongoose';

const router = Router();

export const baseMatchRouteURL = '/api/match';

// Get profile that matches the user's preferences
export const getMatchProfileAPI = '/match-profile';
router.get(getMatchProfileAPI + '/:userID', getMatchProfile);

// Send a match request to another user
export const sendMatchRequestAPI = '/like-profile';
router.post(sendMatchRequestAPI + '/:userID', sendMatchRequest);

// Get all matches requested
export const getAllMatchRequestAPI = '/matches-request';
router.get(getAllMatchRequestAPI + '/:userID', getAllMatchRequest);

// Accept a match request
export const acceptMatchRequestAPI = '/accept-match';
router.post(acceptMatchRequestAPI + '/:userID', acceptMatchRequest);

// Reject a match request
export const declineMatchRequestAPI = '/denied-match';
router.post(declineMatchRequestAPI + '/:matchID', declineMatchRequest);

export default router;