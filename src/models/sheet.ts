import * as mongoose from 'mongoose';
import { Document, Model, Schema } from 'mongoose';

export interface ISheet extends Document {
    sheetURL: string;
    sheetName: string;
    email: string;
}

const sheetSchema = new Schema({
    sheetURL: {
        type: String,
        trim: true,
        required: true,
    },
    sheetName: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
    },
});

const Sheet: Model<ISheet> = mongoose.model('Schema', sheetSchema);

export default Sheet;
