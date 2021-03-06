import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as http from 'http';
import * as path from 'path';
import * as url from 'url';
import opn from 'open';
import { Request, Response } from 'express';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { createHttpTerminator } from 'http-terminator';

dotenv.config();

/**
 * @description Parse the credential keys and return a new oauth2Client with the keys' configurations
 * @param {string} keyPath - path of the credential file
 */
export const parseCredentialKeys = (keyPath: string): OAuth2Client => {
    try {
        if (fs.existsSync(keyPath)) {
            const keys = require(keyPath).web; // eslint-disable-line
            const oauth2Client = new google.auth.OAuth2(keys.client_id, keys.client_secret, keys.redirect_uris[0]);
            return oauth2Client;
        }
    } catch (e) {
        console.log('Error retrieving credential keys: ' + e);
    }
};

/**
 * @description Open an http server to accept the oauth callback. In this simple example, the only request to our webserver is to /callback?code=<code>
 * @param {string[]} scopes - a list of API scopes the user has access to
 * @param {OAuth2Client} authClient - an authenticated Google OAuth2Client parsed from the credential file
 */
export const authenticate = async (scopes: string[], authClient: OAuth2Client): Promise<OAuth2Client> => {
    return new Promise((resolve, reject) => {
        // grab the url that will be used for authorization
        const authorizeUrl = authClient.generateAuthUrl({
            access_type: 'offline',
            scope: scopes.join(' '),
        });

        const server = http.createServer(async (req, res) => {
            try {
                if (req.url.indexOf('code') > -1) {
                    const qs = new url.URL(req.url, 'http://localhost:3000').searchParams;
                    res.end('Authentication successful! Please return to the console.');
                    await httpTerminator.terminate();
                    const { tokens } = await authClient.getToken(qs.get('code'));
                    authClient.credentials = tokens; // eslint-disable-line require-atomic-updates
                    resolve(authClient);
                }
            } catch (e) {
                reject(e);
            }
        });
        server.listen(3000, () => {
            // open the browser to the authorize url to start the workflow
            opn(authorizeUrl, { wait: false })
                .then((cp) => cp.unref())
                .catch((e) => reject(e));
        });
        const httpTerminator = createHttpTerminator({
            server,
        });
    });
};

/**
 * @description Middleware function to ensure the user is authenticated to make the Gmail API call
 */
export const ensureAuthenticated = () =>
    async function (req: Request, res: Response, next: any): Promise<() => void> {
        // set the credential file path
        const scopes = req.body.scopes;
        const keyPath = path.join(__dirname, '..', '..', 'credentials', 'client_secret.json');
        const authClient = parseCredentialKeys(keyPath);
        const auth = await authenticate(scopes.split(','), authClient);
        // store the auth so that successive middleware functions can access the same auth variable
        res.locals.auth = auth;
        return next();
    };
