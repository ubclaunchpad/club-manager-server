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

function createApplicant(name: string, email: string, year: number, major: string, platforms: string, resume: string,
                         website?: string) {
    let applicant: Applicant = {name, email, year, major, platforms, resume, website};
    return applicant;
}

async function setApplicants(sheetUrl: string, sheetName: string, range: string) {
    let data = await getData(sheetUrl, sheetName, range);

    data.map((row) =>{
        let applicant = createApplicant(row[0], row[1], row[2], row[3], row[4], row[5], row[6]);
        console.log(applicant);
    });
}



let dataSheetUrl: string = 'https://docs.google.com/spreadsheets/d/1JgrBy8aWRdGOsFKgXtylsEHFJdKfTWD0tE_cansjpU4/edit#gid=0';

setApplicants(dataSheetUrl, 'Sheet1', 'A2:G12');


// let newApplicant = createApplicant("Test Person6", "test@test.com", 5, "cs", "iOS",
//     "test.com")
//
// addApplicant(dataSheetUrl', 'Sheet1', 'A2:G12', newApplicant);