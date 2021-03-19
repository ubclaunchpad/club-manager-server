import * as express from 'express';

import { createUser, checkUser, createCookie } from '../controllers/user';
import { verifyToken } from '../middleware/auth-token';

const router = express.Router();

/* Checks if the user exists */
router.get('/', verifyToken, checkUser);

/* Turns the credentials extracted during token verification into a user */
router.post('/', verifyToken, createUser);

/* Create cookie for Google access token */
router.get('/token', createCookie);

export default router;
