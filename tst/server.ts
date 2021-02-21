import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import { emailRouter } from '../src/routes/email';
import { authRouter } from '../src/routes/auth';
import { ensureAuthenticated } from '../src/utils/auth/auth-utils';
import applicantRouter from '../src/routes/applicant';
import sheetsRouter from '../src/routes/sheets';
import gradeRouter from '../src/routes/grade';

export const server = express();

// Enable Cross Origin Resource Sharing
server.use(cors());

// parse application/json
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use('/api/auth', authRouter);
server.use('/api/email', ensureAuthenticated(), emailRouter);

server.use(express.json());
server.use('/applicant', applicantRouter);
server.use('/sheets', sheetsRouter);
server.use('/grade', gradeRouter);

server.get('/', async (req, res) => {
    res.send('Hello World!');
});
