import { getSheetData } from '../utils/gsuite/sheets';
import { Applicant } from '../types/applicant';
import ApplicantDB, { IApplicant } from '../models/applicant';
import Sheet, { ISheet } from '../models/sheet';
import { Request, Response } from 'express';
import mongoose from 'mongoose';

/**
 * @description Gets the applicants using the Google Sheet info from the given JSON object in request body
 *              And saves the sheet info to database
 */
export const postSheet = async (req: Request, res: Response): Promise<void> => {
    try {
        const sheet: ISheet = new Sheet({
            sheetURL: req.body.url,
            sheetName: req.body.name,
            email: req.body.email,
        });

        const exists: boolean = await Sheet.exists({ sheetURL: sheet.sheetURL });

        if (!exists) {
            const applicants: Array<Applicant> = await getSheetData(
                sheet.sheetURL,
                sheet.sheetName,
                sheet.email,
                req.body.key,
            );

            const added = await addApplicants(applicants);

            if (added) {
                await sheet.save();
                res.status(201).send('Sheet successfully loaded');
            } else {
                res.status(500).send('Sheet not successfully loaded');
            }
        } else {
            res.status(400).send('Sheet already exists');
        }
    } catch (e) {
        res.status(500).send(e.message);
    }
};

/**
 * @description Updates the applicants from the given Google Sheet URL
 *              Note: currently requires API key to be passed into req body
 */
export const updateSheet = async (req: Request, res: Response): Promise<void> => {
    try {
        const sheet: ISheet = await Sheet.findOne({ sheetURL: req.body.url });

        if (sheet != null) {
            const applicants: Array<Applicant> = await getSheetData(
                sheet.sheetURL,
                sheet.sheetName,
                sheet.email,
                req.body.key,
            );

            const added = await addApplicants(applicants);

            if (added) {
                res.status(200).send('Sheet successfully updated');
            } else {
                res.status(500).send('Sheet was not successfully updated');
            }
        } else {
            res.status(400).send('Sheet does not exist');
        }
    } catch (e) {
        res.status(500).send(e.message);
    }
};

/**
 * @description Deletes the Google Sheet and the applicants linked to the given sheet
 */
export const deleteSheet = async (req: Request, res: Response): Promise<void> => {
    try {
        await Sheet.deleteMany({ sheetURL: req.body.url });

        await ApplicantDB.deleteMany({ sheetURL: req.body.url });

        res.status(200).send('Sheet and linked applicants successfully deleted');
    } catch (e) {
        res.status(500).send(e.message);
    }
};

/**
 * @description Adds applicants to database if not already there
 * @param {Array<Applicant>} applicants - applicants parsed from Google sheet
 */
const addApplicants = async (applicants: Array<Applicant>): Promise<boolean> => {
    for (const applicant of applicants) {
        try {
            const exists: boolean = await ApplicantDB.exists({ email: applicant.email });

            if (!exists) {
                const newApplicant: IApplicant = new ApplicantDB({
                    _id: new mongoose.Types.ObjectId(),
                    firstName: applicant.firstName,
                    lastName: applicant.lastName,
                    email: applicant.email,
                    role: applicant.role,
                    major: applicant.major,
                    yearStanding: applicant.year,
                    status: 'Pending',
                    linkedIn: applicant.linkedin,
                    website: applicant.website,
                    resume: applicant.resume,
                    sheetURL: applicant.sheetURL,
                });
                await newApplicant.save();
            }
        } catch (e) {
            return false;
        }
    }

    return true;
};
