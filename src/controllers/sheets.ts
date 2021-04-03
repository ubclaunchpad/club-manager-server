import { getSheetData } from '../utils/gsuite/sheets';
import { Applicant } from '../types/applicant';
import ApplicantModel, { IApplicant } from '../models/applicant';
import Sheet, { ISheet } from '../models/sheet';
import User from '../models/user';
import { Request, Response } from 'express';
import mongoose, { Schema } from 'mongoose';
import Cookie from 'cookie';

/**
 * @description Gets the applicants using the Google Sheet info from the given JSON object in request body
 *              And saves the sheet info to database
 */
export const postSheet = async (req: Request, res: Response): Promise<void> => {
    try {
        const cookies = Cookie.parse(req.headers.cookie);
        const user = await User.findOne({ googleId: cookies.googleId });

        const sheet: ISheet = new Sheet({
            _id: new mongoose.Types.ObjectId(),
            userId: user.googleId,
            sheetURL: req.body.url,
            sheetName: req.body.name,
            email: req.body.email,
            dateAdded: new Date().toISOString().substring(0, 10),
            dateUpdated: new Date().toISOString().substring(0, 10),
        });

        const exists: boolean = await Sheet.exists({ sheetURL: sheet.sheetURL, userId: user.googleId });

        if (!exists) {
            const applicants: Array<Applicant> = await getSheetData(
                sheet.sheetURL,
                sheet.sheetName,
                cookies.accessToken,
            );

            const added = await addApplicants(applicants, sheet._id, user.googleId);

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
        const cookies = Cookie.parse(req.headers.cookie);
        const user = await User.findOne({ googleId: cookies.googleId });

        const sheet: ISheet = await Sheet.findOne({
            sheetURL: req.body.url,
            sheetName: req.body.name,
            userId: user.googleId,
        });
        await Sheet.updateMany(
            { sheetURL: req.body.url, sheetName: req.body.name, userId: user.googleId },
            { $set: { dateUpdated: new Date().toISOString().substring(0, 10) } },
        );

        if (sheet != null) {
            const applicants: Array<Applicant> = await getSheetData(
                sheet.sheetURL,
                sheet.sheetName,
                cookies.accessToken,
            );

            // this makes sure applicants no longer in the sheet being updated are deleted
            await ApplicantModel.updateMany({ userId: user.googleId }, { $pullAll: { sheets: [sheet._id] } });

            const added = await addApplicants(applicants, sheet._id, user.googleId);

            await ApplicantModel.deleteMany({ userId: user.googleId, sheets: [] });

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
        const cookies = Cookie.parse(req.headers.cookie);
        const user = await User.findOne({ googleId: cookies.googleId });

        const sheet: ISheet = await Sheet.findOneAndDelete({
            sheetURL: req.body.url,
            sheetName: req.body.name,
            userId: user.googleId,
        });
        if (sheet == null) {
            res.status(400).send('Sheet does not exist');
        } else {
            await ApplicantModel.deleteMany({ userId: user.googleId, sheets: [sheet._id] });
            await ApplicantModel.updateMany({ userId: user.googleId }, { $pullAll: { sheets: [sheet._id] } });
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
        const cookies = Cookie.parse(req.headers.cookie);
        const user = await User.findOne({ googleId: cookies.googleId });

        const sheets = await Sheet.find({ userId: user.googleId });
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
 * @param {String} googleId - the google id of the user which added the applicant
 */
const addApplicants = async (
    applicants: Array<Applicant>,
    sheet: Schema.Types.ObjectId,
    googleId: string,
): Promise<boolean> => {
    for (const applicant of applicants) {
        try {
            const iApplicant: IApplicant = await ApplicantModel.findOneAndDelete({
                email: applicant.email,
                userId: googleId,
            });
            let new_sheets: Array<Schema.Types.ObjectId> = [];
            let level = 'Beginner';
            let status = 'Pending Applications';
            let screeningGrade = undefined;
            let interviewGrade = undefined;

            if (iApplicant != null) {
                new_sheets = iApplicant.sheets;
                level = iApplicant.level;
                status = iApplicant.status;
                screeningGrade = iApplicant.screeningGrade;
                interviewGrade = iApplicant.interviewGrade;
            }
            if (!new_sheets.includes(sheet)) {
                new_sheets.push(sheet);
            }

            const newApplicant: IApplicant = new ApplicantModel({
                _id: new mongoose.Types.ObjectId(),
                userId: googleId,
                firstName: applicant.firstName,
                lastName: applicant.lastName,
                email: applicant.email,
                role: applicant.role,
                major: applicant.major,
                yearStanding: applicant.year,
                level: level,
                status: status,
                linkedIn: applicant.linkedin,
                website: applicant.website,
                resume: applicant.resume,
                sheets: new_sheets,
                screeningGrade: screeningGrade,
                interviewGrade: interviewGrade,
            });

            await newApplicant.save();
        } catch (e) {
            return false;
        }
    }

    return true;
};
