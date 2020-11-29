import mongoose from 'mongoose';
import { Request, Response } from 'express';
import Applicant, { IApplicant } from '../models/applicant';
import ScreeningGrade, { IScreeningGrade } from '../models/screening-grade';

export const createApplicant = async (req: Request, res: Response): Promise<void> => {
    const newApplicant: IApplicant = new Applicant({
        _id: new mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        role: req.body.role,
        major: req.body.major,
        yearStanding: req.body.yearStanding,
        status: req.body.status,
        linkedIn: req.body.linkedIn,
        website: req.body.website,
        resume: req.body.resume,
        sheetURL: req.body.sheetURL,
    });

    try {
        await newApplicant.save(async () => {
            const newGrade: IScreeningGrade = new ScreeningGrade({
                applicant: newApplicant._id,
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
            await newGrade.save();
        });
        res.status(201).send('Successfully created new applicant.');
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateApplicantStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const valid_status = ['Pending', 'Accepted', 'Rejected', 'Scheduled'];
        const my_applicant = await Applicant.findOne({ _id: req.body.id });

        // Check that status is valid
        if (!valid_status.includes(req.body.status)) {
            res.status(400).send(`"${req.body.status}" is not a valid status.`);
        }
        // Check that applicant exists in the database
        else if (my_applicant == null) {
            res.status(400).send('No applicants match that id');
        }
        // Idempotent when status would be unchanged
        else if (my_applicant.status === req.body.status) {
            res.status(200).send(`Status already set to "${req.body.status}"`);
        }
        // Update the applicant's status
        else {
            my_applicant.status = req.body.status;
            await my_applicant.save();
            res.status(200).send(`Successfully set status to "${req.body.status}"`);
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

export const listAllApplicants = async (req: Request, res: Response): Promise<void> => {
    try {
        const applicants = await Applicant.find();
        res.status(201).send(applicants);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

export const findGrade = async (req: Request<any>, res: Response): Promise<void> => {
    try {
        const grade = await ScreeningGrade.findOne({ applicant: req.params.applicantId });
        res.status(201).send(grade);
    } catch (error) {
        res.status(500).send(error);
    }
};
