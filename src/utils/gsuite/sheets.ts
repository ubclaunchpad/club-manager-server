import { google } from 'googleapis';
import { Applicant, setApplicants } from '../../types/applicant';

/** @description Authorizes the client for access to Sheets API
 * @param {any} client - The client with Sheets API access keys
 * */
const authorize = (client) => {
    client.authorize(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Connected to Sheets API');
        }
    });
    return client;
};

/** @description Creates and authorizes a client using the given email and key
 * @param {string} clientEmail - The client service account email
 * @param {string} clientKey - The client API access key
 *  */
const client = (clientEmail: string, clientKey: string) => {
    return authorize(
        new google.auth.JWT(clientEmail, null, clientKey, ['https://www.googleapis.com/auth/spreadsheets']),
    );
};

/**
 * @description Parses applicant data from given Google sheet URL and name
 *              Note: the sheet must to open to access by URL or must give the Google service account email
 *              (which is found in keys.json) access
 * @param {string} url - The URL of the Google sheet
 * @param {string} sheetName - The name of the Google sheet
 * @param {string} clientEmail - The client service account email
 * @param {string} clientKey - The client API access key
 */
export async function getSheetData(
    url: string,
    sheetName: string,
    clientEmail: string,
    clientKey: string,
): Promise<Array<Applicant>> {
    const sheetsClient = client(clientEmail, clientKey);
    const gsapi = google.sheets({ version: 'v4', auth: sheetsClient });

    const id = getSheetID(url);

    const opt = {
        spreadsheetId: id,
        range: `${sheetName}`,
    };

    const data = await gsapi.spreadsheets.values.get(opt);

    return setApplicants(data.data.values, id);
}

/**
 * @description Extracts sheet id from url
 * @param {string} url - The url of the google sheet
 */
function getSheetID(url: string) {
    let id = url.match('/spreadsheets\\/d\\/([a-zA-Z0-9-_]+)')[0];
    id = id.replace('/spreadsheets/d/', '');
    return id;
}
