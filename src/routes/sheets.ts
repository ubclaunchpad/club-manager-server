import * as express from 'express';
import { postSheet, deleteSheet, updateSheet } from '../controllers/sheets';

const router = express.Router();

/**
 * @description Gets the applicants from the given Google Sheet
 */
router.post('/', postSheet);

/**
 * @description Updates the applicants from the given Google Sheet
 */
router.patch('/', updateSheet);

/**
 * @description Deletes the applicants linked to the given Google Sheet
 */
router.delete('/', deleteSheet);

export default router;
