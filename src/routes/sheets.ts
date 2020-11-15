import * as express from 'express';
import { postSheet } from '../controllers/sheets';

const router = express.Router();

/**
 * @description Gets the applicants using the Google Sheet info from the given JSON object in request body
 */
router.post('/', postSheet);

export default router;
