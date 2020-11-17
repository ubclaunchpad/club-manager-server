import * as mongoose from 'mongoose';
import { Document, Model, Schema } from 'mongoose';

export interface IApplicant extends Document {
    firstName: string;
    lastName: string;
    role: string;
    major: string;
    yearStanding: string;
    level: string;
    status: string;
    linkedIn: string;
    website: string;
    resume: string;
}

const applicantSchema = new Schema({
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
    level: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced"],
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Screened: Accepted', 'Screened: Rejected', 'Scheduled for Interview', 'Final Decision: Accepted', 'Final Decision: Rejected', 'Archived: Rejected'],
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
});

const Applicant: Model<IApplicant> = mongoose.model('Applicant', applicantSchema);

export default Applicant;
