/** @description Represents an applicant with the listed fields */
export interface Applicant {
    sheetID: string;
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
    sheetID: string,
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
    const applicant: Applicant = { sheetID, firstName, lastName, email, year, major, role, resume, website, linkedin };
    return applicant;
}

/**
 * @description Creates a list of applicants by parsing the Google sheet with given URL and sheet name
 * @param {any[][]} sheetsData - The parsed data from a Google sheet.
 * @param {string} sheetID - The sheet id from which the users are being imported
 */
export function setApplicants(sheetsData: any[][], sheetID: string): Array<Applicant> {
    const applicants: Array<Applicant> = [];
    const headers: Map<string, number> = new Map();

    parseColumnHeaders(sheetsData[0], headers);

    // loops over each row
    for (let _i = 1; _i < sheetsData.length; _i++) {
        const row = sheetsData[_i];

        // creates applicant using data from the specified columns of the sheet
        const applicant = createApplicant(
            sheetID,
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
