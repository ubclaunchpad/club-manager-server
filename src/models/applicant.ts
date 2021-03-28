import mongoose from 'mongoose';
import { Document, Model, Schema } from 'mongoose';

export interface IApplicant extends Document {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    major: string;
    yearStanding: number;
    level: string;
    status: string;
    linkedIn?: string;
    website?: string;
    resume?: string;
    screeningGrade?: { type: Schema.Types.ObjectId; ref: 'ScreeningGrade' };
    interviewGrade?: { type: Schema.Types.ObjectId; ref: 'InterviewGrade' };
    sheets?: Array<Schema.Types.ObjectId>;
}

const applicantSchema = new Schema({
    userId: {
        type: String,
        trim: true,
        required: true,
    },
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
    email: {
        type: String,
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
    level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        required: true,
    },
    status: {
        type: String,
        enum: [
            'Pending Applications',
            'Application Reviewed',
            'Screened: Accepted',
            'Screened: Rejected',
            'Scheduled For Interview',
            'Interviewed',
            'Final Decision: Accepted',
            'Final Decision: Rejected',
            'Archived: Accepted',
            'Archived: Rejected',
        ],
        default: 'Pending Applications',
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
        required: false,
    },
    interviewGrade: {
        type: Schema.Types.ObjectId,
        ref: 'InterviewGrade',
        required: false,
    },
    sheets: [{ type: Schema.Types.ObjectId, required: false }],
});

const Applicant: Model<IApplicant> = mongoose.model('Applicant', applicantSchema);

export default Applicant;
