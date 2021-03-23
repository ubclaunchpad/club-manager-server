import * as dotenv from 'dotenv';
import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import { emailRouter } from './routes/email';
import { emailGridRouter } from './routes/email-grid';
import { authRouter } from './routes/auth';
import { ensureAuthenticated } from './utils/auth/auth-utils';
import applicantRouter from './routes/applicant';
import userRouter from './routes/user';
import sheetsRouter from './routes/sheets';
import gradeRouter from './routes/grade';

import { sendEmail } from './utils/mail/sendgrid';

dotenv.config();

const PORT = process.env.PORT || 4000;
const server = express();

// Enable Cross Origin Resource Sharing
server.use(
    cors({
        credentials: true,
        origin: true,
    }),
);

// parse application/json
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use('/api/auth', authRouter);
server.use('/api/email', emailGridRouter);
server.use('/api/email', ensureAuthenticated(), emailRouter);

sendEmail('nancywan1004@gmail.com', {
    from: 'ubc.launchpad.clubmanager@gmail.com',
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy!',
    html: '<h1>and easy!</h1>',
});

// Establish DB connection
require('./database/mongodb');

server.use(express.json());
server.use('/applicant', applicantRouter);
server.use('/sheets', sheetsRouter);
server.use('/grade', gradeRouter);
server.use('/user', userRouter);

server.get('/', async (req, res) => {
    res.send('Hello World!');
});

server.listen(PORT, () => {
    console.log(`Server is running in on port ${PORT}`);
});
