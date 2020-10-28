import {google} from 'googleapis'

export default class SendingUtils {
    /* TODO: Creat an email message and encode it to Base64 */
    static createEmailMessage(requestBody: string): string {
        // a test encoded email
        return 'RnJvbTogPEZST01AZ21haWwuY29tPgpUbzogPG5hbmN5d2FuMTAwNEBnbWFpbC5jb20+ClN1YmplY3Q6IFRlc3QgRW1haWwKClRlc3Q=';
    }

    /** Send an email through an authorized Gmail account 
     *  @param {google.auth.OAuth2} auth An authorized OAuth2 client.
     *  @param {string} email message sent in request body
     */
    static async sendEmail(auth: any, reqBody: string): Promise<any> {
        const gmail = google.gmail({ version: 'v1', auth });
        const res = await gmail.users.messages.send({
            userId: 'me',
            requestBody: {
                raw: this.createEmailMessage(reqBody)
            }
        });
        console.log(res.data);
        return res;
    }
}
