import express from 'express';
import { emailRouter } from './routes/email';
import { ensureAuthenticated } from './auth/auth'

const PORT = process.env.PORT || 4000;
const server = express();

server.get('/', async (req, res) => {
    res.send('Hello World!');
});

server.use('/', ensureAuthenticated(), emailRouter)

server.listen(PORT, () => {
    console.log(`Server is running in on port ${PORT}`);
});
