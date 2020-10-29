import * as dotenv from "dotenv";
import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';
import * as url from 'url';
import * as opn from 'open';
import {
    createHttpTerminator,
  } from 'http-terminator';

import {google} from 'googleapis';

dotenv.config();

/**
 * To use OAuth2 authentication, we need access to a a CLIENT_ID, CLIENT_SECRET, AND REDIRECT_URI.  To get these credentials for your application, visit https://console.cloud.google.com/apis/credentials.
 */
let keys;
const keyPath = path.join(__dirname, 'client_secret.json');
if (fs.existsSync(keyPath)) {
  keys = require(keyPath).web;
}

/**
 * Create a new OAuth2 client with the configured keys.
 */
const oauth2Client = new google.auth.OAuth2(
  keys.client_id,
  keys.client_secret,
  keys.redirect_uris[0]
);

/**
 * This is one of the many ways you can configure googleapis to use authentication credentials.  In this method, we're setting a global reference for all APIs.  Any other API you use here, like google.drive('v3'), will now use this auth client. You can also override the auth client at the service and method call levels.
 */

/**
 * Open an http server to accept the oauth callback. In this simple example, the only request to our webserver is to /callback?code=<code>
 */
async function authenticate(scopes) {
  return new Promise((resolve, reject) => {
    // grab the url that will be used for authorization
    const authorizeUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes.join(' '),
    });

    const server = http.createServer(async (req, res) => {
        try {
          if (req.url.indexOf('code') > -1) {
            const qs = new url.URL(req.url, 'http://localhost:3000')
              .searchParams;
            res.end('Authentication successful! Please return to the console.');
            await httpTerminator.terminate();
            const {tokens} = await oauth2Client.getToken(qs.get('code'));
            oauth2Client.credentials = tokens; // eslint-disable-line require-atomic-updates
            resolve(oauth2Client);
          }
        } catch (e) {
          reject(e);
        }
      })
      server.listen(3000, () => {
        // open the browser to the authorize url to start the workflow
        opn(authorizeUrl, {wait: false}).then(cp => cp.unref()).catch((e)=>reject(e));
      });
      const httpTerminator = createHttpTerminator({
        server,
      });
    // destroyer(server);
  });
}

/**
 * 
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function runSample(auth) {
    const gmail = google.gmail({version: 'v1', auth});
    const res = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        // Replace with `projects/${PROJECT_ID}/topics/${TOPIC_NAME}`
        raw: 'RnJvbTogPEZST01AZ21haWwuY29tPgpUbzogPG5hbmN5d2FuMTAwNEBnbWFpbC5jb20+ClN1YmplY3Q6IFRlc3QgRW1haWwKClRlc3Q='
      }
    });
    console.log(res.data);
    return res;
}

const scopes = ['https://www.googleapis.com/auth/gmail.send'];

export const ensureAuthenticated = () => async function (req, res, next: any): Promise<any> {
    // Load client secrets from a local file.
    const authClient = await authenticate(scopes);
    // const response = await runSample(authClient)
    // console.log(response)
    res.locals.auth = authClient;
    return next();
}