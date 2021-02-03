import * as mongoose from 'mongoose';
import { Document, Model, Schema } from 'mongoose';

export interface ISheet extends Document {
    _id: Schema.Types.ObjectId;
    sheetURL: string;
    sheetName: string;
    email: string;
}

const sheetSchema = new Schema({
    _id: Schema.Types.ObjectId,
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

const Sheet: Model<ISheet> = mongoose.model('Sheet', sheetSchema);

export default Sheet;
