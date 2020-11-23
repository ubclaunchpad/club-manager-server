import mongoose from 'mongoose';

const ENDPOINT = process.env.ENDPOINT_DB || 'mongodb://mongodb:27017/club-manager';

mongoose.connect(ENDPOINT, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
    console.log(`Connected to database at ${ENDPOINT}`);
});
