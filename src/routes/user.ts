import * as express from 'express';
import { createUser, createCookie } from '../controllers/user';
import { verifyToken } from '../middleware/auth-token';

const router = express.Router();

/* Turns the credentials extracted during token verification into a user */
router.post('/create', verifyToken, createUser);

// Create cookie for Google access token
router.get('/token', createCookie);

export default router;
