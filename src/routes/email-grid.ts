import { Request, Response, Router } from 'express';
import { sendEmail } from '../utils/mail/sendgrid';

const emailGridRouter = Router();

/**
 * @description POST request to send an email from an authorized Gmail account
 */
emailGridRouter.post('/', async (req: Request, res: Response) => {
    try {
        const recipient = req.body.recipient;
        const action = req.body.action;
        const resp = await sendEmail(recipient, action);
        if (resp[0].statusCode === 202) {
            res.send('Mail sent successfully!');
        }
        if (resp === 'Invalid SendGrid API key') {
            res.send('Mail not sent due to: ' + resp);
        }
    } catch (e) {
        res.status(404).send(e.message);
    }
});

export default emailGridRouter;
