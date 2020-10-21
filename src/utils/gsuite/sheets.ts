import { Applicant} from '../../types/applicant';

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

async function addApplicant(url: string, sheetName: string, range: string, applicant: Applicant) {
    const cl = await authorize();
    const gsapi = google.sheets({version: 'v4', auth: cl});

    let id = url.match('/spreadsheets\\/d\\/([a-zA-Z0-9-_]+)')[0];
    id = id.replace('/spreadsheets/d/', '');

    const appendOptions = {
        spreadsheetId: id,
        range: `${sheetName}!${range}`,
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'INSERT_ROWS',
        resource: {values: applicant}
    };

    let res = await gsapi.spreadsheets.values.update(appendOptions);

    console.log(res.data);
}