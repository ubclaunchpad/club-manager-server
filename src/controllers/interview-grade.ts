import { Request, Response } from 'express';
import Applicant from '../models/applicant';
import InterviewGrade, { IInterviewGrade } from '../models/interview-grade';

export const createInterviewGrade = async (req: Request<any>, res: Response): Promise<void> => {
    try {
        const applicant = await Applicant.findOne({_id: req.params.applicantId })
        const newInterviewGrade: IInterviewGrade = new InterviewGrade({
            applicant: applicant._id,
            applicantName: applicant.firstName + " " + applicant.lastName,
            experienceLvl: req.body.experienceLvl,
            interviewer1: req.body.interviewer1,
            interviewer2: req.body.interviewer2,
            date: new Date(req.body.date).toLocaleDateString('en-US'),
            intro: req.body.intro,
            experience: req.body.experience,
            depth: req.body.depth,
            whiteboard: req.body.whiteboard,
            conclusion: req.body.conclusion,
            debrief: req.body.debrief,
        })
        await newInterviewGrade.save();
        res.status(201).send(newInterviewGrade);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const updateInterviewNumericalGrade = async (req: Request<any>, res: Response): Promise<void> => {
    try {
        const interviewGrade = await InterviewGrade.findOne({ applicant: req.params.applicantId });
        if (interviewGrade == null) {
            res.status(400).send('No interview grade is found to match that id');
        }
        interviewGrade.experience.technical = !req.body.experience || req.body.experience.technical == undefined ? interviewGrade.experience.technical : req.body.experience.technical;
        interviewGrade.experience.teamwork = !req.body.experience || req.body.experience.teamwork == undefined ? interviewGrade.experience.teamwork : req.body.experience.teamwork;
        interviewGrade.depth.score = !req.body.depth || req.body.depth.score == undefined ? interviewGrade.depth.score : req.body.depth.score;
        interviewGrade.whiteboard.score = !req.body.whiteboard || req.body.whiteboard.score == undefined ? interviewGrade.whiteboard.score : req.body.whiteboard.score;
        interviewGrade.debrief = req.body.debrief == undefined ? interviewGrade.debrief : req.body.debrief;
        await interviewGrade.save();
        res.status(201).send(interviewGrade);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getInterviewGrade = async (req: Request<any>, res: Response): Promise<void> => {
    try {
        const interviewGrade = await InterviewGrade.findOne({ applicant: req.params.applicantId });
        if (interviewGrade == null) {
            res.status(400).send('No interview grade is found to match that id');
        }
        res.status(201).send(interviewGrade);
    } catch (error) {
        res.status(500).send(error);
    }
};
