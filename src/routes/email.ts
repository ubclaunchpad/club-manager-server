import { Request, Response, Router } from 'express';
import { sendEmail } from '../utils/mail/sending-utils';

export const emailRouter = Router();

/**
 * @description POST request to send an email from an authorized Gmail account
 */
emailRouter.post('/send', async (req: Request, res: Response) => {
    try {
        const authClient = res.locals.auth;
        const rawMsg = req.body.raw;
        const resp = await sendEmail(authClient, rawMsg);
        if (resp.status === 200) {
            res.send('Mail sent successfully!');
        }
    } catch (e) {
        res.status(404).send(e.message);
    }
});
