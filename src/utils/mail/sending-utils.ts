import { google, gmail_v1 } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { GaxiosResponse } from 'gaxios';

/**
 * Encode an email message to Base64
 */
export const encodeEmail = (requestBody: string): string => {
    const encodedMsg = Buffer.from(requestBody).toString('base64');
    return encodedMsg;
};

/** Send an email through an authorized Gmail account
 *  @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 *  @param {string} email message sent in request body
 */
export const sendEmail = async (
    auth: OAuth2Client,
    reqBody: string,
): Promise<GaxiosResponse<gmail_v1.Schema$Message>> => {
    // eslint-disable-line
    const gmail = google.gmail({ version: 'v1', auth });
    const res = await gmail.users.messages.send({
        userId: 'me',
        requestBody: {
            raw: encodeEmail(reqBody),
        },
    });
    console.log(res.data);
    return res;
};
