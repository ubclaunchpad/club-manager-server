import { getData } from '../utils/gsuite/sheets';

/** @description Represents an applicant with the listed fields */
export interface Applicant {
    firstName: string;
    lastName: string;
    email: string;
    year: number;
    major: string;
    role: string;
    resume: string;
    website?: string;
    linkedin?: string;
    [propName: string]: any; // Future-proofing for cases where applicant can have other properties
}

/**
 * @description Instantiate applicant with the given parameters
 * @constructor
 */
function createApplicant(
    firstName: string,
    lastName: string,
    email: string,
    year: number,
    major: string,
    role: string,
    resume: string,
    website?: string,
    linkedin?: string,
) {
    const applicant: Applicant = { firstName, lastName, email, year, major, role, resume, website, linkedin };
    return applicant;
}

/**
 * @description Creates a list of applicants by parsing the Google sheet with given URL and sheet name
 * @param {string} sheetUrl - The URL of the Google sheet.
 * @param {string} sheetName - The name of the Google sheet.
 */
async function setApplicants(sheetUrl: string, sheetName: string): Promise<Array<Applicant>> {
    const applicants: Array<Applicant> = [];
    const data = await getData(sheetUrl, sheetName);
    const headers: Map<string, number> = new Map();

    parseColumnHeaders(data[0], headers);

    // loops over each row
    for (let _i = 1; _i < data.length; _i++) {
        const row = data[_i];

        // creates applicant using data from the specified columns of the sheet
        const applicant = createApplicant(
            row[headers.get('first name')],
            row[headers.get('last name')],
            row[headers.get('email')],
            row[headers.get('year')],
            row[headers.get('major')],
            row[headers.get('role')],
            row[headers.get('resume')],
            row[headers.get('website')],
            row[headers.get('linkedin')],
        );
        applicants.push(applicant);
    }

    return applicants;
}

/**
 * @description Creates a mapping of the column headers with their index
 * @param {string[]} columns - The column names of the sheet
 * @param {Map<string, number>} headers - A map of the column names and their respective index
 */
const parseColumnHeaders = (columns: string[], headers: Map<string, number>) => {
    for (let _i = 0; _i < columns.length; _i++) {
        headers.set(columns[_i].trim().toLowerCase(), _i);
    }
};

/**
 * The code below is for demo with a test sheet
 * Can test by running command: ts-node ./src/types/applicant
 */

/** URL of sample data sheet with applicants */
const dataSheetUrl = 'https://docs.google.com/spreadsheets/d/1knAAeS1sn6GsT5V12nrZo-2Ma9dyPGVoOGphhSBq0zo/edit#gid=0';

/** creating list of applicants and printing them to console */
setApplicants(dataSheetUrl, 'Sheet1').then((applicants) => {
    console.log(applicants);
});
