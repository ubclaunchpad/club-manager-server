import { Applicant } from '../../types/applicant';

import { google } from 'googleapis';

/** @description    This is path to json file with the service account keys
 *                  these keys can be generated by creating a service account from the google developers console
 *                  change the path to that of the file that you generate to access the sheets api
 *                  note: if the sheets is not open to access by url, then need to make the service account email an editor
 */
import keys from '../../../keys.json';

// this creates the client using the API key
const client = new google.auth.JWT(keys.client_email, null, keys.private_key, [
    'https://www.googleapis.com/auth/spreadsheets',
]);
// authorizes the client
function authorize() {
    client.authorize(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Connected');
        }
    });
}

// note: if the sheets is not open to access by url, then need to make the service account email an editor
export async function getData(url: string, sheetName: string, range: string): Promise<any[][]> {
    authorize();
    const gsapi = google.sheets({ version: 'v4', auth: client });

    const id = getSheetID(url);

    const opt = {
        spreadsheetId: id,
        range: `${sheetName}!${range}`,
    };

    const data = await gsapi.spreadsheets.values.get(opt);

    return data.data.values;
}

export async function addApplicant(
    url: string,
    sheetName: string,
    range: string,
    applicant: Applicant,
): Promise<number> {
    authorize();
    const gsapi = google.sheets({ version: 'v4', auth: client });

    const id = getSheetID(url);

    const appendOptions = {
        spreadsheetId: id,
        range: `${sheetName}!${range}`,
        valueInputOption: 'USER_ENTERED',
        resource: {
            values: [
                [
                    applicant.firstName,
                    applicant.lastName,
                    applicant.role,
                    applicant.major,
                    applicant.email,
                    applicant.year,
                    applicant.resume,
                    applicant.website,
                    applicant.linkedin,
                ],
                // Insert additional rows if needed
            ],
        },
    };

    const res = await gsapi.spreadsheets.values.append(appendOptions);

    return res.status;
}

// extracts sheets id from url
function getSheetID(url: string) {
    let id = url.match('/spreadsheets\\/d\\/([a-zA-Z0-9-_]+)')[0];
    id = id.replace('/spreadsheets/d/', '');
    return id;
}
