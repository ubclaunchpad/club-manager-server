import { Request, Response } from 'express';
import Applicant from '../models/applicant';
import ScreeningGrade, { IScreeningGrade } from '../models/screening-grade';

export const createScreeningGrade = async (req: Request<any>, res: Response): Promise<void> => {
    try {
        const applicant = await Applicant.findOne({ _id: req.params.applicantId });
        const newScreeningGrade: IScreeningGrade = new ScreeningGrade({
            applicant: applicant._id,
            c1: req.body.c1,
            c2: req.body.c2,
            c3: req.body.c3,
            c4: req.body.c4,
            c5: req.body.c5,
            c6: req.body.c6,
            total:
                parseInt(req.body.c1) +
                parseInt(req.body.c2) +
                parseInt(req.body.c3) +
                parseInt(req.body.c4) +
                parseInt(req.body.c5) +
                parseInt(req.body.c6),
        });
        await newScreeningGrade.save();
        res.status(201).send(newScreeningGrade);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateScreeningNumericalGrade = async (req: Request<any>, res: Response): Promise<void> => {
    try {
        const screeningGrade = await ScreeningGrade.findOne({ applicant: req.params.applicantId });
        if (screeningGrade == null) {
            res.status(400).send('No screening grade is found to match that id');
        }
        screeningGrade.c1 = req.body.c1 == undefined ? screeningGrade.c1 : req.body.c1;
        screeningGrade.c2 = req.body.c2 == undefined ? screeningGrade.c2 : req.body.c2;
        screeningGrade.c3 = req.body.c3 == undefined ? screeningGrade.c3 : req.body.c3;
        screeningGrade.c4 = req.body.c4 == undefined ? screeningGrade.c4 : req.body.c4;
        screeningGrade.c5 = req.body.c5 == undefined ? screeningGrade.c5 : req.body.c5;
        screeningGrade.c6 = req.body.c6 == undefined ? screeningGrade.c6 : req.body.c6;
        screeningGrade.total =
            screeningGrade.c1 +
            screeningGrade.c2 +
            screeningGrade.c3 +
            screeningGrade.c4 +
            screeningGrade.c5 +
            screeningGrade.c6;
        await screeningGrade.save();
        res.status(201).send(screeningGrade);
    } catch (error) {
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
