import * as path from 'path';
import { Router } from 'express';
import { authenticate, parseCredentialKeys } from '../utils/auth/auth-utils';

export const authRouter = Router();

/**
 * A POST request to retrieve the access token from the OAuth2Client
 */
authRouter.post('/auth', async (req, res) => {
    try {
        // A list of API scopes that a verified user is able to access
        const scopes = req.body.scopes || [];
        // set the credential file path
        const keyPath = path.join(__dirname, '..', 'credentials', 'client_secret.json');
        const authClient = parseCredentialKeys(keyPath);
        const auth = await authenticate(scopes.split(','), authClient);
        // store the auth so that successive middleware functions can access the same auth variable
        res.send(auth);
    } catch (e) {
        res.status(404).send(e.message);
    }
});
