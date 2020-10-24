import {getData, addApplicant} from '../utils/gsuite/sheets';

export interface Applicant {
    name: string,
    email: string,
    year: number,
    major: string,
    platforms: string,
    resume: string,
    website?: string
}

// creates an instance of an applicant with the given parameters
function createApplicant(name: string, email: string, year: number, major: string, platforms: string, resume: string,
                         website?: string) {
    let applicant: Applicant = {name, email, year, major, platforms, resume, website};
    return applicant;
}

// creates a list of applicants by parsing google sheets with given url, sheet name, and data range
// range has form 'A1:G12'
async function setApplicants(sheetUrl: string, sheetName: string, range: string) {
    let applicants: Array<Applicant> = [];
    let data = await getData(sheetUrl, sheetName, range);

    data.map((row) =>{
        let applicant = createApplicant(row[0], row[1], row[2], row[3], row[4], row[5], row[6]);
        applicants.push(applicant);
    });

    return applicants;
}


// url of sample data sheet with applicants
let dataSheetUrl = 'https://docs.google.com/spreadsheets/d/1JgrBy8aWRdGOsFKgXtylsEHFJdKfTWD0tE_cansjpU4/edit#gid=0';
let applicants: Array<Applicant> = [];
// creating list of applicants
setApplicants(dataSheetUrl, 'Sheet1', 'A2:G12').then(((data) => {
    applicants = data;
}))
// printing out applicants to console
applicants.forEach((applicant) => console.log(applicant));

// creates new test applicant
let newApplicant = createApplicant("Test Person7", "test@test.com", 5, "cs", "iOS",
    "test.com")

// adds applicant to the sheet after the end of the given range
addApplicant(dataSheetUrl, 'Sheet1', 'A2:G12', newApplicant);