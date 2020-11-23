import Applicant, { IApplicant } from '../models/applicant';
import { Request, Response } from 'express';
import mongoose from 'mongoose';

export const createApplicant = async (req: Request, res: Response): Promise<void> => {
    const new_applicant: IApplicant = new Applicant({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        role: req.body.role,
        major: req.body.major,
        yearStanding: req.body.yearStanding,
        level: req.body.level,
        status: req.body.status,
        linkedIn: req.body.linkedIn,
        website: req.body.website,
        resume: req.body.resume,
    });

    try {
        await new_applicant.save();
        res.status(201).send('Successfully created new applicant.');
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateApplicantFields = async (req: Request, res: Response): Promise<void> => {
    const valid_status = [
        'Pending',
        'Screened: Accepted',
        'Screened: Rejected',
        'Scheduled for Interview',
        'Final Decision: Accepted',
        'Final Decision: Rejected',
        'Archived: Rejected',
    ];
    const valid_level = ['Beginner', 'Intermediate', 'Advanced'];
    const allowed_updates = ['status', 'level']; // id is passed in the body but is not an update

    // Check for a valid id
    if (!req.params.id) {
        res.status(400).send('No id specified');
        return;
    } else if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).send('Request supplied an invalid id.');
        return;
    }

    // Validate the keys
    const updates = Object.keys(req.body);
    const valid = updates.every((field) => {
        return allowed_updates.includes(field);
    });
    if (!valid) {
        res.status(400).send('Invalid updates requested');
        return;
    }

    // Validate the new values
    if (updates.includes('status') && !valid_status.includes(req.body.status)) {
        res.status(400).send(`"${req.body.status}" is not a valid status.`);
        return;
    }
    if (updates.includes('level') && !valid_level.includes(req.body.level)) {
        res.status(400).send(`"${req.body.level}" is not a valid level.`);
        return;
    }

    try {
        // Check that applicant exists
        const my_applicant = await Applicant.findOne({ _id: req.params.id });
        if (!my_applicant) {
            res.status(404).send('No applicants match that id');
            return;
        }

        // Apply the updates
        updates.forEach((update) => {
            my_applicant[update] = req.body[update];
        });

        await my_applicant.save();
        res.status(200).send('Successfully updated the applicant with all the supplied fields');
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
