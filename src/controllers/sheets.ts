import { getSheetData } from '../utils/gsuite/sheets';
import { Applicant } from '../types/applicant';

/**
 * @description Gets the applicants using the Google Sheet info from the given JSON object in request body
 *              And sends the array of objects
 */
export const postSheet = async (req, res) => {
    try {
        const sheet = {
            url: req.body.url,
            sheetName: req.body.name,
            email: req.body.email,
            key: req.body.key,
        };

        const applicants: Map<string, Applicant> = await getSheetData(
            sheet.url,
            sheet.sheetName,
            sheet.email,
            sheet.key,
        );

        res.status(200).send(Array.from(applicants.values()));
    } catch (e) {
        res.status(404).send(e.message);
    }
};
