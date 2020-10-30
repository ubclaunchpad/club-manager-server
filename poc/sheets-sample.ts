import { getSheetData } from '../src/utils/gsuite/sheets';

/** @description This is path to json file with the service account keys
 *               These keys can be generated by creating a service account from the Google Developers Console
 *               Change the path to that of the file that you generate to access the Sheets API
 */
import keys from '../keys.json';

/**
 * The code below is for demo with a test sheet
 * Can test by running command: ts-node ./src/types/applicant
 */

/** URL of sample data sheet with applicants */
const dataSheetUrl = 'https://docs.google.com/spreadsheets/d/1knAAeS1sn6GsT5V12nrZo-2Ma9dyPGVoOGphhSBq0zo/edit#gid=0';

/** creating list of applicants and printing them to console */
getSheetData(dataSheetUrl, 'Sheet1', keys.client_email, keys.private_key).then((applicants) => {
    console.log(applicants);
});