import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Applicant from '../models/applicant';
import InterviewGrade, { IInterviewGrade } from '../models/interview-grade';

export const createInterviewGrade = async (req: Request<any>, res: Response): Promise<void> => {
    const allowedLevel = ['Beginner', 'Independent', 'Experienced'];

    if (req.body.level == null || !allowedLevel.includes(req.body.level)) {
        res.status(400).send(
            'Request could not be processed, body must include "level", [Beginner, Independent, Experienced]',
        );
        return;
    }

    try {
        const applicant = await Applicant.findById(req.params.applicantId);

        // If a Interview Grade already exists, then we delte it to ensure that there is only one
        await InterviewGrade.findOneAndDelete({
            applicant: mongoose.Types.ObjectId(req.params.applicantId),
        });

        const newInterviewGrade: IInterviewGrade = new InterviewGrade({
            // TODO refactor to just deconstruct the req.body object onto the newInterviewGrade object
            applicant: applicant._id,
            interviewer1: req.body.interviewer1,
            interviewer2: req.body.interviewer2,
            intro: req.body.intro,
            experienceTechnical: req.body.experienceTechnical,
            experienceTeamwork: req.body.experienceTeamwork,
            depthTopic: req.body.depthTopic,
            depthScore: req.body.depthScore,
            whiteboardQuestion: req.body.whiteboardQuestion,
            whiteboardScore: req.body.whiteboardScore,
            whiteboardComments: req.body.whiteboardComments,
            conclusionTimeCommitment: req.body.conclusionTimeCommitment,
            conclusionQuestions: req.body.conclusionQuestions,
            debrief: req.body.debrief,
        });

        newInterviewGrade.total =
            newInterviewGrade.experienceTechnical +
            newInterviewGrade.experienceTeamwork +
            newInterviewGrade.depthScore +
            newInterviewGrade.whiteboardScore +
            newInterviewGrade.debrief;

        applicant.level = req.body.level;
        applicant.interviewGrade = newInterviewGrade._id;

        await newInterviewGrade.save();
        await applicant.save();

        res.status(201).send(newInterviewGrade);
    } catch (error) {
        console.log(`Error: ${error}`);
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
