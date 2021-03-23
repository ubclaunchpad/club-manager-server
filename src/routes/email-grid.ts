import { Request, Response, Router } from 'express';
import { Mail } from '../types/mail';
import { sendEmail } from '../utils/mail/sendgrid';

export const emailGridRouter = Router();

/**
 * @description POST request to send an email from an authorized Gmail account
 */
emailGridRouter.post('/send-grid', async (req: Request, res: Response) => {
    try {
        const mailMessage: Mail = {
            from: req.body.from,
            subject: req.body.subject,
            text: req.body.text,
            html: req.body.html,
        };
        const recipient = req.body.recipient;
        const resp = await sendEmail(recipient, mailMessage);
        if (resp[0].statusCode === 202) {
            res.send('Mail sent successfully!');
        }
    } catch (e) {
        res.status(404).send(e.message);
    }
});
