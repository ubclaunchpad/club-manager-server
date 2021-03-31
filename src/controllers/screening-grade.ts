import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Applicant from '../models/applicant';
import ScreeningGrade, { IScreeningGrade } from '../models/screening-grade';

export const createScreeningGrade = async (req: Request<any>, res: Response): Promise<void> => {
    const allowedLevel = ['Beginner', 'Independent', 'Experienced'];
    const allowedScore = [0, 1, 2];

    if (req.body.level == null || !allowedLevel.includes(req.body.level)) {
        res.status(400).send(
            'Request could not be processed, body must include "level", [Beginner, Independent, Experienced]',
        );
        return;
    }

    const scoringUpdates = ['c1', 'c2', 'c3'];

    scoringUpdates.forEach((c) => {
        if (req.body[c] == null || !allowedScore.includes(parseInt(req.body[c]))) {
            res.status(400).send(`Request could not be processed, body must include "${c}", [0, 1, 2]`);
            return;
        }
    });

    try {
        const applicant = await Applicant.findById(req.params.applicantId);

        // If a Screening Grade already exists, then we delete it to ensure that there is only one
        await ScreeningGrade.findOneAndDelete({
            applicant: mongoose.Types.ObjectId(req.params.applicantId),
        });

        // Generate a new Screening Grade corresponding to the applicant
        const newScreeningGrade: IScreeningGrade = new ScreeningGrade({
            applicant: applicant._id,
            c1: req.body.c1,
            c2: req.body.c2,
            c3: req.body.c3,
            total: parseInt(req.body.c1) + parseInt(req.body.c2) + parseInt(req.body.c3),
        });

        // Update the applicant's skill level
        applicant.level = req.body.level;
        applicant.screeningGrade = newScreeningGrade._id;

        await newScreeningGrade.save();
        await applicant.save();

        res.status(201).send(newScreeningGrade);
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).send(error);
    }
};

export const getScreeningGrade = async (req: Request<any>, res: Response): Promise<void> => {
    try {
        const screeningGrade = await ScreeningGrade.findOne({ applicant: req.params.applicantId });
        if (screeningGrade == null) {
            res.status(400).send('No screening grade is found to match that id');
        }
        res.status(201).send(screeningGrade);
    } catch (error) {
        res.status(500).send(error);
    }
};
