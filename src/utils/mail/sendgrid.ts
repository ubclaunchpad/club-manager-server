import sgMail from '@sendgrid/mail';
import Mail from '../../models/mails/mail';
import FinalAcceptanceMail from '../../models/mails/finalAcceptanceMail';
import FinalRejectionMail from '../../models/mails/finalRejectionMail';
import ScreeningAcceptanceMail from '../../models/mails/screeningAcceptanceMail';
import ScreeningRejectionMail from '../../models/mails/screeningRejectionMail';

/** @description Send an email through the SendGrid API
 *  @param { string } recipients - recipients of the desired email
 *  @param { Mail } mail - the email message to be sent
 */
export const sendEmail = async (recipient: string, action: string): Promise<any> => {
    sgMail.setApiKey(process.env.APIKEY_SENDGRID);
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
