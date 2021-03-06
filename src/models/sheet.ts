import * as mongoose from 'mongoose';
import { Document, Model, Schema } from 'mongoose';

export interface ISheet extends Document {
    _id: Schema.Types.ObjectId;
    userId: string;
    sheetURL: string;
    sheetName: string;
    email: string;
    dateCreated: string;
    dateUpdated: string;
}

const sheetSchema = new Schema({
    _id: Schema.Types.ObjectId,
    userId: {
        type: String,
        trim: true,
        required: true,
    },
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
        required: false,
    },
    dateAdded: {
        type: String,
        required: true,
    },
    dateUpdated: {
        type: String,
        required: true,
    },
});

const Sheet: Model<ISheet> = mongoose.model('Sheet', sheetSchema);

export default Sheet;
