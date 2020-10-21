import { Applicant} from '../../types/applicant';
import {emit} from 'cluster';

const {google} = require('googleapis');
const keys = require('../../../keys.json')

const client = new google.auth.JWT(
  keys.client_email, null, keys.private_key, ['https://www.googleapis.com/auth/spreadsheets']
);

function authorize() {
    client.authorize(function (err) {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log('Connected');
        }
    });
}

export async function getData(url: string, sheetName: string, range: string) {
     authorize();

    const gsapi = google.sheets({version: 'v4', auth: client});

    let id = url.match('/spreadsheets\\/d\\/([a-zA-Z0-9-_]+)')[0];
    id = id.replace('/spreadsheets/d/', '');

    const opt = {
        spreadsheetId: id,
        range: `${sheetName}!${range}`
    };

    let data = await gsapi.spreadsheets.values.get(opt);

    return data.data.values;
}

export async function addApplicant(url: string, sheetName: string, range: string, applicant: Applicant) {
    authorize();
    const gsapi = google.sheets({version: 'v4', auth: client});

    let id = url.match('/spreadsheets\\/d\\/([a-zA-Z0-9-_]+)')[0];
    id = id.replace('/spreadsheets/d/', '');

    const appendOptions = {
        spreadsheetId: id,
        range: `${sheetName}!${range}`,
        valueInputOption: 'USER_ENTERED',
        resource: {values: [
            [applicant.name, applicant.email, applicant.year, applicant.major, applicant.platforms,
                applicant.resume, applicant.website]
        ]}
    };

    let res = await gsapi.spreadsheets.values.append(appendOptions);

    console.log(res.data);
}