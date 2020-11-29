import { getSheetData } from '../utils/gsuite/sheets';
import { Applicant } from '../types/applicant';
import Sheet, { ISheet } from '../models/sheet';
import { Request, Response } from 'express';

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

        const exists = await Sheet.findOne({ sheetURL: sheet.sheetURL });

        if (!exists) {
            await sheet.save();
            const applicants: Array<Applicant> = await getSheetData(
                sheet.sheetURL,
                sheet.sheetName,
                sheet.email,
                req.body.key,
            );
            res.status(200).send(applicants);
        }

        res.status(400).send('Sheet already exists');
    } catch (e) {
        res.status(500).send(e.message);
    }
};
