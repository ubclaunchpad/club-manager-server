import * as express from 'express';
import { createUser } from '../controllers/user';
import { verifyToken } from '../middleware/auth-token';

const router = express.Router();

/* Turns the credentials extracted during token verification into a user */
router.post('/', verifyToken, createUser);

export default router;
