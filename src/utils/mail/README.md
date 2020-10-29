# Running the mail sending test app

### Pre-requisites:
1. Download client_secret.json from Google API console [Credential page](https://console.developers.google.com/apis/credentials/oauthclient/), and put it under the `/src/auth`. If you don't yet have an OAuth client ID, create a new one with application type Web Application.
2. Create a .env file and set the **HTTP_PROXY** and **HTTPS_PROXY** variables to your system/user's proxy IP, e.g.
```
HTTP_PROXY=http://127.0.0.1:15236
HTTPS_PROXY=http://127.0.0.1:15236
```
3. Change the raw message content to send a test email to your email account on **line 11** in `createEmailMessage` of `src/utils/mail/sending-utils.ts`. A sample message is in format of the following. Copy the whole text over to a [Base64 encoder](https://ostermiller.org/calc/encode.html) to obtain the encoded message and paste it to the raw field.
```
From: <FROM@gmail.com>
To: <TO@gmail.com>
Subject: Test Email

Test
```
### Run it in your terminal:
```
$ npm install
$ npm run start
```


