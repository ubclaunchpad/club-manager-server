import mongoose from 'mongoose';

const ENDPOINT = process.env.ENDPOINT_DB || 'mongodb://mongodb:27017/club-manager'; // try switching to mongodb://127.0.0.1:27017/club-manager if not working on a local instace

mongoose.connect(ENDPOINT, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
    console.log(`Connected to database at ${ENDPOINT}`);
});
