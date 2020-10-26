import { getData, addApplicant } from '../utils/gsuite/sheets';

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
}

// creates an instance of an applicant with the given parameters
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

// creates a list of applicants by parsing google sheets with given url, sheet name, and data range
// range has form 'A1:G12'
async function setApplicants(sheetUrl: string, sheetName: string, range: string) {
    const applicants: Array<Applicant> = [];
    const data = await getData(sheetUrl, sheetName, range);

    data.map((row) => {
        const applicant = createApplicant(row[0], row[1], row[4], row[5], row[3], row[2], row[6], row[7], row[8]);
        applicants.push(applicant);
    });

    return applicants;
}

// url of sample data sheet with applicants
// let dataSheetUrl = 'https://docs.google.com/spreadsheets/d/1JgrBy8aWRdGOsFKgXtylsEHFJdKfTWD0tE_cansjpU4/edit#gid=0';
const dataSheetUrl = 'https://docs.google.com/spreadsheets/d/1knAAeS1sn6GsT5V12nrZo-2Ma9dyPGVoOGphhSBq0zo/edit#gid=0';

// creating list of applicants
setApplicants(dataSheetUrl, 'Sheet1', 'A2:I15').then((applicants) => {
    console.log(applicants);
});

// creates new test applicant
const newApplicant = createApplicant('Test15', 'Person15', 'test@test.com', 5, 'cs', 'iOS', 'test.com');

// adds applicant to the sheet after the end of the given range
addApplicant(dataSheetUrl, 'Sheet1', 'A2:I15', newApplicant).then((res) => console.log(res));
