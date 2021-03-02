import { google } from 'googleapis';
import { Applicant, setApplicants } from '../../types/applicant';

/**
 * @description Parses applicant data from given Google sheet URL and name
 *              Note: the sheet must to open to access by URL or must give the Google service account email
 *              (which is found in keys.json) access
 * @param {string} url - The URL of the Google sheet
 * @param {string} sheetName - The name of the Google sheet
 * @param {string} accessToken - The access token from the Google OAuth
 */
export const getSheetData = async (url: string, sheetName: string, accessToken: string): Promise<Array<Applicant>> => {
    const gsapi = google.sheets({ version: 'v4' });

    const opt = {
        spreadsheetId: getSheetID(url),
        range: `${sheetName}`,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };

    const data = await gsapi.spreadsheets.values.get(opt);

    return setApplicants(data.data.values, url);
};

/**
 * @description Extracts sheet id from url
 * @param {string} url - The url of the google sheet
 */
const getSheetID = (url: string): string => {
    let id = url.match('/spreadsheets\\/d\\/([a-zA-Z0-9-_]+)')[0];
    id = id.replace('/spreadsheets/d/', '');
    return id;
};
