import * as express from 'express';
import { createApplicant, updateApplicantStatus, listAllApplicants, findGrade } from '../controllers/applicant';

const router = express.Router();

/* Returns a list of all applicants currently in the database */
router.get('/', listAllApplicants);

/* Return the grade of an applicant given the id passed into the request body */
router.post('/grade/', findGrade);

/* Turns the JSON object passed in the request body into a new applicant */
router.post('/', createApplicant);

/* Sets the status of the applicant matching 'id' */
router.patch('/', updateApplicantStatus);

export default router;
