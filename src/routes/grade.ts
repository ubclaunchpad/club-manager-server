import * as express from 'express';
import { createInterviewGrade, getInterviewGrade, updateInterviewNumericalGrade } from '../controllers/interview-grade';
import { createScreeningGrade, getScreeningGrade } from '../controllers/screening-grade';

const router = express.Router();

/* Return the screening grade of an applicant given the id passed into the request query param */
router.get('/screening/:applicantId/', getScreeningGrade);

/* Return the interview grade of an applicant given the id passed into the request query param */
router.get('/interview/:applicantId/', getInterviewGrade);

/* Turns the JSON object passed in the request body into a new screening report for the applicant */
router.post('/screening/:applicantId/', createScreeningGrade);

/* Turns the JSON object passed in the request body into a new interview report for the applicant */
router.post('/interview/:applicantId/', createInterviewGrade);

/* Sets the interview numerical grades of the applicant matching the applicantId in the query param */
router.patch('/interview/:applicantId/', updateInterviewNumericalGrade);

export default router;
