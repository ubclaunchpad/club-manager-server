import * as express from 'express';
import { createApplicant, updateApplicantFields, listAllApplicants } from '../controllers/applicant';
import { verifyToken } from '../middleware/auth-token';

const router = express.Router();

/* Returns a list of all applicants currently in the database */
router.get('/', listAllApplicants);

/* Turns the JSON object passed in the request body into a new applicant */
router.post('/', createApplicant);

/* Sets the status of the applicant matching 'id' */
router.patch('/:id', updateApplicantFields);

/* Endpoint used for sanity checking */
router.get('/debug', verifyToken, (req, res) => {
    res.status(200).send('Success');
});

export default router;
