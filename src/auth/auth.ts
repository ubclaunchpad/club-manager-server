import * as fs from 'fs';
import * as readLine  from 'readline';
import {google, oauth2_v1} from 'googleapis';
import { Request, Response } from 'express';

/**
 * If modifying these scopes, delete token.json.
 */
const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];

/** The file token.json stores the user's access and refresh tokens, and is
 * created automatically when the authorization flow completes for the first
 * time.
 */
const TOKEN_PATH = 'token.json';

/**
 * Ensure user is authenticated with the given credentials and store the OAuth2 client
 * to res.locals.auth and go to the next middleware function in the route
 */
export const ensureAuthenticated = () => async function (req: Request, res: Response, next: any): Promise<any> {
  // Load client secrets from a local file.
  try {
    fs.readFile('credentials.json', (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      // Authorize a client with credentials, then call the Gmail API.
      res.locals.auth = authorize(JSON.parse(content.toString()));
      return next();
    });
  } catch (e) {
    console.log("Error retrieving credentials: " + e);
  }

}

/**
 * Create an OAuth2 client with the given credentials
 * @param {Object} credentials The authorization client credentials.
 */
const authorize = (credentials): any => {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client);
    oAuth2Client.setCredentials(JSON.parse(token.toString()));
    return oAuth2Client;
  });
}

/**
 * Get and store new token after prompting for user authorization
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 */
const getNewToken = (oAuth2Client): void => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
    });
  });
}