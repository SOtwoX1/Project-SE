import { Router } from 'express';
import { acceptMatchRequest, declineMatchRequest, getAllMatchRequest, getMatchProfile, sendMatchRequest } from '../services/matchService.js';

const router = Router();

// Get profile that matches the user's preferences
router.get('/match-profile/:userID', getMatchProfile);

// Send a match request to another user
router.post('/like-profile/:userID', sendMatchRequest);

// Get all matches requested
router.get('/matches-request/:userID', getAllMatchRequest);

// Accept a match request
router.post('/accept-match/:userID', acceptMatchRequest);

// Reject a match request
router.post('/denied-match/:matchID', declineMatchRequest);

export default router;