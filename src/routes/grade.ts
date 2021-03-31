import * as express from 'express';
import { createInterviewGrade, getInterviewGrade } from '../controllers/interview-grade';
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

export default router;
