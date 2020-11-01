import { Router } from 'express';
import { sendEmail } from '../utils/mail/sending-utils';

export const emailRouter = Router();

/**
 * A POST request to send an email from an authorized Gmail account
 */
emailRouter.post('/email', async (req, res) => {
    try {
        const authClient = res.locals.auth;
        const reqBody = req.body;
        const resp = await sendEmail(authClient, reqBody);
        if (resp.status === 200) {
            // TODO: Additional response handling
            res.send({ status: 'successful' });
        }
    } catch (e) {
        res.status(404).send(e.message);
    }
});
