import * as mongoose from 'mongoose';

const ENDPOINT = process.env.ENDPOINT_DB || 'localhost:27018';

mongoose.connect(ENDPOINT, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
    console.log(`Connected to database at ${ENDPOINT}`);
});