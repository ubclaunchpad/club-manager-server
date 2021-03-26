import { Request, Response, Router } from 'express';
import FinalAcceptanceMail from '../models/mails/finalAcceptanceMail';
import FinalRejectionMail from '../models/mails/finalRejectionMail';
import Mail from '../models/mails/mail';
import ScreeningAcceptanceMail from '../models/mails/screeningAcceptanceMail';
import ScreeningRejectionMail from '../models/mails/screeningRejectionMail';
import { sendEmail } from '../utils/mail/sendgrid';

const emailGridRouter = Router();

/**
 * @description POST request to send an email from an authorized Gmail account
 */
emailGridRouter.post('/', async (req: Request, res: Response) => {
    try {
        const recipient = req.body.recipient;
        const action = req.body.action;
        let mailMessage: Mail;
        switch (action) {
            case 'Schedule':
                mailMessage = new ScreeningAcceptanceMail();
                break;
            case 'Reject-Screen':
                mailMessage = new ScreeningRejectionMail();
                break;
            case 'Accpet-Final':
                mailMessage = new FinalAcceptanceMail();
                break;
            case 'Reject-Final':
                mailMessage = new FinalRejectionMail();
                break;
        }
        const resp = await sendEmail(recipient, mailMessage);
        if (resp[0].statusCode === 202) {
            res.send('Mail sent successfully!');
        }
    } catch (e) {
        res.status(404).send(e.message);
    }
});

export default emailGridRouter;
