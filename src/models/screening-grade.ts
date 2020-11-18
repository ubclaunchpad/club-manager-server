import mongoose from 'mongoose';
import { Document, Model, Schema } from 'mongoose';

export interface IScreeningGrade extends Document {
    applicant: { type: Schema.Types.ObjectId; ref: 'Applicant' };
    c1: number; // Willingness to learn (self-drive/are you taking time out of classes to learn and develop?)
    c2: number; // Passion and interest (eg comprehensiveness of answer to "tell us about a project", even if not technically competent)
    c3: number; // Rate the best of the provided items from the OR/AND's from the relevant skill bucket they fall in
    c4: number; // Beginner (put 2 if yes, put 0 if not) view Recruitment overview for criteria for beginner
    c5: number; // Independent (put 2 if yes, put 0 if not) view Recruitment overview for criteria for independent
    c6: number; // Experienced (put 2 if yes, put 0 if not) view Recruitment overview for criteria for experienced
    total: number;
}

const gradeSchema = new Schema({
    applicant: {
        type: Schema.Types.ObjectId,
        ref: 'Applicant',
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
    c4: {
        type: Number,
        enum: [0, 1, 2],
        default: 0,
        required: true,
    },
    c5: {
        type: Number,
        enum: [0, 1, 2],
        default: 0,
        required: true,
    },
    c6: {
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
