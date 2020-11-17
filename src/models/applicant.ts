import mongoose from 'mongoose';
import { Document, Model, Schema } from 'mongoose';

export interface IApplicant extends Document {
    _id: Schema.Types.ObjectId;
    firstName: string;
    lastName: string;
    role: string;
    major: string;
    yearStanding: string;
    status: string;
    linkedIn: string;
    website: string;
    resume: string;
    screeningGrade: { type: Schema.Types.ObjectId; ref: 'ScreeningGrade' };
}

const applicantSchema = new Schema({
    _id: Schema.Types.ObjectId,
    firstName: {
        type: String,
        trim: true,
        required: true,
    },
    lastName: {
        type: String,
        trim: true,
        required: true,
    },
    role: {
        type: String,
        enum: ['Developer', 'Designer'],
        default: 'Developer',
        required: true,
    },
    major: {
        type: String,
        required: true,
    },
    yearStanding: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Rejected', 'Scheduled'],
        default: 'Pending',
        required: true,
    },
    linkedIn: {
        type: String,
        required: false,
    },
    website: {
        type: String,
        required: false,
    },
    resume: {
        type: String,
        required: false,
    },
    screeningGrade: {
        type: Schema.Types.ObjectId,
        ref: 'ScreeningGrade',
    },
});

const Applicant: Model<IApplicant> = mongoose.model('Applicant', applicantSchema);

export default Applicant;
