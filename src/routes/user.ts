import * as express from 'express';

import { createUser, checkUser, createCookie, deleteCookie } from '../controllers/user';
import { verifyToken } from '../middleware/auth-token';

const router = express.Router();

/* Checks if the user exists */
router.get('/', verifyToken, checkUser);

/* Turns the credentials extracted during token verification into a user */
router.post('/', verifyToken, createUser);

/* Create cookies for Google access token and user ID */
router.get('/token', createCookie);

/* Deletes the cookies upon logout */
router.delete('/token', deleteCookie);

export default router;
