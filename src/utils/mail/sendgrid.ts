import sgMail from '@sendgrid/mail';
import Mail from '../../models/mails/mail';

/** @description Send an email through the SendGrid API
 *  @param { string } recipients - recipients of the desired email
 *  @param { Mail } mail - the email message to be sent
 */
export const sendEmail = async (recipient: string, mail: Mail): Promise<any> => {
    sgMail.setApiKey(process.env.APIKEY_SENDGRID);
    return new Promise((resolve, reject) => {
        const mailWithSender: any = { to: recipient, ...mail };
        sgMail
            .send(mailWithSender)
            .then((resp) => {
                console.log(`Mail sent to ${recipient}`);
                return resolve(resp);
            })
            .catch((error) => {
                console.log(`Mail Error: ${error}`);
                return reject();
            });
    });
};

module.exports = {
    sendEmail,
};
