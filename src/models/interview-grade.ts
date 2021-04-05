import mongoose from 'mongoose';
import { IApplicant } from './applicant';
import { Document, Model, Schema } from 'mongoose';

export interface IInterviewGrade extends Document {
    applicant: IApplicant['_id'];
    interviewer1: string;
    interviewer2?: string;
    intro: string;
    experienceTechnical: number;
    experienceTeamwork: number;
    experienceComments: string;
    depthTopic: string;
    depthScore: number;
    depthComments: string;
    whiteboardQuestion: string;
    whiteboardScore: number;
    whiteboardComments: string;
    conclusionTimeCommitment: string;
    conclusionQuestions: string;
    debrief: number;
    total: number;
}

const gradeSchema = new Schema({
    applicant: {
        type: Schema.Types.ObjectId,
        ref: 'Applicant',
        required: true,
    },
    interviewer1: {
        type: String,
        required: true,
    },
    interviewer2: {
        type: String,
        required: false,
    },
    intro: {
        type: String,
        required: false,
    },
    experienceTechnical: {
        type: Number,
        enum: [0, 1, 2],
        default: 0,
        required: true,
    },
    experienceTeamwork: {
        type: Number,
        enum: [0, 1, 2, 3, 4],
        default: 0,
        required: true,
    },
    experienceComments: {
        type: String,
        required: false,
    },
    depthTopic: {
        type: String,
        enum: ['Client/Server', 'Mobile', 'Others'],
        default: 'Client/Server',
        required: true,
    },
    depthScore: {
        type: Number,
        enum: [0, 1, 2, 3, 4],
        default: 0,
        required: true,
    },
    depthComments: {
        type: String,
        required: false,
    },
    whiteboardQuestion: {
        type: String,
        required: true,
    },
    whiteboardScore: {
        type: Number,
        enum: [0, 1, 2, 3, 4],
        default: 0,
        required: true,
    },
    whiteboardComments: {
        type: String,
        required: true,
    },
    conclusionTimeCommitment: {
        type: String,
        enum: ['Yes', 'No', 'Non-committal'],
        default: 'Yes',
        required: true,
    },
    conclusionQuestions: {
        type: String,
        required: true,
    },
    debrief: {
        type: Number,
        enum: [1, 2, 3],
        default: 1,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
});

const InterviewGrade: Model<IInterviewGrade> = mongoose.model('InterviewGrade', gradeSchema);

export default InterviewGrade;
