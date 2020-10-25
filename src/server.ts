import * as express from 'express';

const PORT = process.env.PORT || 4000;
const server = express();

server.get('/', async (req, res) => {
    res.send('Hello World!');
});

server.listen(PORT, () => {
    console.log(`Server is running in on port ${PORT}`);
});