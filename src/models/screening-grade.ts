import mongoose from 'mongoose';
import { IApplicant } from './applicant';
import { Document, Model, Schema } from 'mongoose';

export interface IScreeningGrade extends Document {
    applicant: IApplicant['_id'];
    c1: number; // Willingness to learn (self-drive/are you taking time out of classes to learn and develop?)
    c2: number; // Passion and interest (e.g. comprehensiveness of answer to "tell us about a project", even if not technically competent)
    c3: number; // Rate the best of the provided items from the OR/AND's from the relevant skill bucket they fall in
    total: number;
}

const gradeSchema = new Schema({
    applicant: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    c1: {
        type: Number,
        enum: [0, 1, 2],
        default: 0,
        required: true,
    },
    c2: {
        type: Number,
        enum: [0, 1, 2],
        default: 0,
        required: true,
    },
    c3: {
        type: Number,
        enum: [0, 1, 2],
        default: 0,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
});

const ScreeningGrade: Model<IScreeningGrade> = mongoose.model('ScreeningGrade', gradeSchema);

export default ScreeningGrade;
