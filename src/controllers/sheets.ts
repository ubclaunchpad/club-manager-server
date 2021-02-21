import { getSheetData } from '../utils/gsuite/sheets';
import { Applicant } from '../types/applicant';
import ApplicantModel, { IApplicant } from '../models/applicant';
import Sheet, { ISheet } from '../models/sheet';
import { Request, Response } from 'express';
import mongoose, { Schema } from 'mongoose';

/**
 * @description Gets the applicants using the Google Sheet info from the given JSON object in request body
 *              And saves the sheet info to database
 */
export const postSheet = async (req: Request, res: Response): Promise<void> => {
    try {
        const sheet: ISheet = new Sheet({
            _id: new mongoose.Types.ObjectId(),
            sheetURL: req.body.url,
            sheetName: req.body.name,
            email: req.body.email,
            dateAdded: new Date().toISOString().substring(0, 10),
            dateUpdated: new Date().toISOString().substring(0, 10)
        });

        const exists: boolean = await Sheet.exists({ sheetURL: sheet.sheetURL });

        if (!exists) {
            const applicants: Array<Applicant> = await getSheetData(
                sheet.sheetURL,
                sheet.sheetName,
                sheet.email,
                req.body.key,
            );

            const added = await addApplicants(applicants, sheet._id);

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
        await Sheet.update({ sheetURL: req.body.url }, {$set: {dateUpdated: new Date().toISOString().substring(0, 10)}});

        if (sheet != null) {
            const applicants: Array<Applicant> = await getSheetData(
                sheet.sheetURL,
                sheet.sheetName,
                sheet.email,
                req.body.key,
            );

            // this makes sure applicants no longer in the sheet being updated are deleted
            await ApplicantModel.updateMany({}, { $pullAll: { sheets: [sheet._id] } });
            await ApplicantModel.deleteMany({ sheets: [] });

            const added = await addApplicants(applicants, sheet._id);

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
 * @description Deletes the Google Sheet and the applicants linked to only the given sheet
 *              If applicant is also linked to other sheets, will only remove link to given sheet
 */
export const deleteSheet = async (req: Request, res: Response): Promise<void> => {
    try {
        const sheet: ISheet = await Sheet.findOneAndDelete({ sheetURL: req.body.url });
        if (sheet == null) {
            res.status(400).send('Sheet does not exist');
        } else {
            await ApplicantModel.deleteMany({ sheets: [sheet._id] });
            await ApplicantModel.updateMany({}, { $pullAll: { sheets: [sheet._id] } });
            res.status(200).send('Sheet and linked applicants successfully deleted');
        }
    } catch (e) {
        res.status(500).send(e.message);
    }
};

/**
 * @description Lists all the Google Sheets in the database
 */
export const listAllSheets = async (req: Request, res: Response): Promise<void> => {
    try {
        const sheets = await Sheet.find();
        res.status(201).send(sheets);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

/**
 * @description Adds applicants to database if not already there, otherwise updates it from the new sheet
 * @param {Array<Applicant>} applicants - applicants parsed from Google sheet
 * @param {Schema.Types.ObjectId} sheet - ObjectId of the linked sheet
 */
const addApplicants = async (applicants: Array<Applicant>, sheet: Schema.Types.ObjectId): Promise<boolean> => {
    for (const applicant of applicants) {
        try {
            const iApplicant: IApplicant = await ApplicantModel.findOneAndDelete({ email: applicant.email });
            let new_sheets: Array<Schema.Types.ObjectId> = [];

            if (iApplicant != null) {
                new_sheets = iApplicant.sheets;
            }
            if (!new_sheets.includes(sheet)) {
                new_sheets.push(sheet);
            }

            const newApplicant: IApplicant = new ApplicantModel({
                _id: new mongoose.Types.ObjectId(),
                firstName: applicant.firstName,
                lastName: applicant.lastName,
                email: applicant.email,
                role: applicant.role,
                major: applicant.major,
                yearStanding: applicant.year,
                level: 'Beginner',
                status: 'Pending',
                linkedIn: applicant.linkedin,
                website: applicant.website,
                resume: applicant.resume,
                sheets: new_sheets,
            });

            await newApplicant.save();
        } catch (e) {
            return false;
        }
    }

    return true;
};
