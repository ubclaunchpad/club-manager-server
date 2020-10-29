import { google } from 'googleapis'


/**
 * TODO: Creat an email message and encode it to Base64 
 */
export const createEmailMessage = (requestBody: string): string => {
    // A hardcode test email message
    // Note: Please use a Base64 text encoder/decoder to customize your email message
    // and remember to change the recipient for testing purpose 
    return 'RnJvbTogPEZST01AZ21haWwuY29tPgpUbzogPG5hbmN5d2FuMTAwNEBnbWFpbC5jb20+ClN1YmplY3Q6IFRlc3QgRW1haWwKClRlc3Q=';
}

/** Send an email through an authorized Gmail account 
 *  @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 *  @param {string} email message sent in request body
 */
export const sendEmail = async (auth: any, reqBody: string): Promise<any> => {
    const gmail = google.gmail({ version: 'v1', auth });
    const res = await gmail.users.messages.send({
        userId: 'me',
        requestBody: {
            raw: createEmailMessage(reqBody)
        }
    });
    console.log(res.data);
    return res;
}
