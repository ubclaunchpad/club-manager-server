import { google, gmail_v1 } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { GaxiosResponse } from 'gaxios';

/**
 * @description Encode an email message to Base64
 * @param { string } rawMsg - raw email message sent in request body
 */
export const encodeEmail = (rawMsg: string): string => {
    const encodedMsg = Buffer.from(rawMsg).toString('base64');
    return encodedMsg;
};

/** @description Send an email through an authorized Gmail account
 *  @param {google.auth.OAuth2} auth - auth An authorized OAuth2 client.
 *  @param {string} rawMsg - raw email message sent in request body
 */
export const sendEmail = async (
    auth: OAuth2Client,
    rawMsg: string,
): Promise<GaxiosResponse<gmail_v1.Schema$Message>> => {
    // eslint-disable-line
    const gmail = google.gmail({ version: 'v1', auth });
    const res = await gmail.users.messages.send({
        userId: 'me',
        requestBody: {
            raw: encodeEmail(rawMsg),
        },
    });
    console.log(res.data);
    return res;
};
