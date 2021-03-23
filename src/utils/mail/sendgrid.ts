import sgMail from '@sendgrid/mail';
import { Mail } from '../../types/mail';

/** @description Send an email through the SendGrid API
 *  @param { [string] } recipients - recipients of the desired email
 *  @param { Mail } mail - the email message to be sent
 */
export const sendEmail = (recipients: [string], mail: Mail): void => {
    sgMail.setApiKey(process.env.APIKEY_SENDGRID);
    recipients.forEach((recipient) => {
        const mailWithSender = { to: recipient, ...mail };
        sgMail
            .send(mailWithSender)
            .then(() => console.log(`Mail sent to ${recipient}`))
            .catch((error) => console.log(`Mail Error: ${error}`));
    });
};

module.exports = {
    sendEmail,
};
