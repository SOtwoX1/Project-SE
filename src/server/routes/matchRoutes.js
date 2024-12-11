import { Router } from 'express';
import { acceptMatchRequest, declineMatchRequest, getAllMatchRequest, getMatchProfile, sendMatchRequest } from '../services/matchService.js';
import { matchRoutesURL } from '../../apiConfig.js';

const router = Router();

// Get profile that matches the user's preferences
router.get(matchRoutesURL.getMatchProfileAPI + '/:userID', getMatchProfile);

// Send a match request to another user
router.post(matchRoutesURL.sendMatchRequestAPI + '/:userID', sendMatchRequest);

// Get all matches requested
router.get(matchRoutesURL.getAllMatchRequestAPI + '/:userID', getAllMatchRequest);

// Accept a match request
router.put(matchRoutesURL.acceptMatchRequestAPI + '/:userID', acceptMatchRequest);

// Reject a match request
router.delete(matchRoutesURL.declineMatchRequestAPI + '/:matchID', declineMatchRequest);

export default router;