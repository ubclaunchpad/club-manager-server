import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import { emailRouter } from './routes/email';
import { authRouter } from './routes/auth';
import { ensureAuthenticated } from './utils/auth/auth-utils';
import applicantRouter from './routes/applicant';
import userRouter from './routes/user';
import sheetsRouter from './routes/sheets';

const PORT = process.env.PORT || 4000;
const server = express();

// Enable Cross Origin Resource Sharing
server.use(cors());

// parse application/json
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use('/api/auth', authRouter);
server.use('/api/email', ensureAuthenticated(), emailRouter);
// Establish DB connection
require('./database/mongodb');

server.use(express.json());
server.use('/applicant', applicantRouter);
server.use('/sheets', sheetsRouter);
server.use('/user', userRouter);

server.get('/', async (req, res) => {
    res.send('Hello World!');
});

server.listen(PORT, () => {
    console.log(`Server is running in on port ${PORT}`);
});
