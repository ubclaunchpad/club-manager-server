import * as express from 'express';
import { createApplicant, updateApplicantFields, listAllApplicants } from '../controllers/applicant';

const router = express.Router();

/* Returns a list of all applicants currently in the database */
router.get('/', listAllApplicants);

/* Turns the JSON object passed in the request body into a new applicant */
router.post('/', createApplicant);

/* Sets the status of the applicant matching 'id' */
router.patch('/:id', updateApplicantFields);

export default router;
