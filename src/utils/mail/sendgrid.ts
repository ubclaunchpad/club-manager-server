import sgMail from '@sendgrid/mail';
import Mail from '../../resources/mail/mail';
import FinalAcceptanceMail from '../../resources/mail/final-acceptance-mail';
import FinalRejectionMail from '../../resources/mail/final-rejection-mail';
import ScreeningAcceptanceMail from '../../resources/mail/screening-acceptance-mail';
import ScreeningRejectionMail from '../../resources/mail/screening-rejection-mail';

/** @description Send an email through the SendGrid API
 *  @param { string } recipients - recipients of the desired email
 *  @param { Mail } mail - the email message to be sent
 */
export const sendEmail = async (recipient: string, action: string): Promise<any> => {
    const apiKey = process.env.APIKEY_SENDGRID;
    if (!apiKey) {
        // only perform state transition flow without sending the email
        return Promise.resolve('Invalid SendGrid API key');
    }
    sgMail.setApiKey(apiKey);
    return new Promise((resolve, reject) => {
        let mailMessage: Mail;
        switch (action) {
            case 'Email-Schedule':
                mailMessage = new ScreeningAcceptanceMail();
                break;
            case 'Email-Reject-Screen':
                mailMessage = new ScreeningRejectionMail();
                break;
            case 'Email-Accept':
                mailMessage = new FinalAcceptanceMail();
                break;
            case 'Email-Reject-Final':
                mailMessage = new FinalRejectionMail();
                break;
            default:
                return;
        }
        const mailWithSender: any = { to: recipient, ...mailMessage };
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
