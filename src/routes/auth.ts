import * as path from 'path';
import { Request, Response, Router } from 'express';
import { authenticate, parseCredentialKeys } from '../utils/auth/auth-utils';

export const authRouter = Router();

/**
 * @description POST request to retrieve the access token from the OAuth2Client
 */
authRouter.post('/', async (req: Request, res: Response) => {
    try {
        // A list of API scopes that a verified user is able to access
        const scopes = req.body.scopes;
        // set the credential file path
        const keyPath = path.join(__dirname, '..', 'credentials', 'client_secret.json');
        const authClient = parseCredentialKeys(keyPath);
        const auth = await authenticate(scopes.split(','), authClient);
        res.send(auth);
    } catch (e) {
        res.status(404).send(e.message);
    }
});
