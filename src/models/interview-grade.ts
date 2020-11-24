import mongoose from 'mongoose';
import { Document, Model, Schema } from 'mongoose';

export interface IInterviewGrade extends Document {
    applicant: { type: Schema.Types.ObjectId; ref: 'Applicant' };
    applicantName: string;
    experienceLvl: string;
    interviewer1: string;
    interviewer2?: string;
    date: Date;
    intro?: string;
    experience: {
        technical: number;
        teamwork: number;
        comments?: string;
    };
    depth: {
        topic: string;
        score: number;
        comments?: string;
    };
    whiteboard: {
        question: string;
        score: string;
        comments?: string;
    };
    conclusion: {
        commitment: string;
        questions?: string;
    }
    debrief: number; // the level from 1-3 you rate as how much you would want to work with this person
}

const gradeSchema = new Schema({
    applicant: {
        type: Schema.Types.ObjectId,
        ref: 'Applicant',
        required: true,
    },
    applicantName: {
        type: String,
        required: true,
    },
    experienceLvl: {
        type: String,
        enum: ['Beginner', 'Independent', 'Experienced'],
        default: 'Beginner',
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
    date: {
        type: Date,
        required: true,
    },
    intro: {
        type: String,
        required: false,
    },
    experience: {
        technical: {
            type: Number,
            enum: [0, 1, 2],
            default: 0,
            required: true,
        },
        teamwork: {
            type: Number,
            enum: [0, 1, 2],
            default: 0,
            required: true,
        },
        comments: {
            type: String,
            required: false,
        }
    },
    depth: {
        topic: {
            type: String,
            enum: ['Client/Server', 'Mobile', 'Others'],
            default: 'Client/Server',
            required: true,
        },
        score: {
            type: Number,
            enum: [0, 1, 2],
            default: 0,
            required: true,
        },
        comments: {
            type: String,
            required: false,
        }
    },
    whiteboard: {
        question: {
            type: String,
            required: true,
        },
        score: {
            type: Number,
            enum: [0, 1, 2],
            default: 0,
            required: true,
        },
        comments: {
            type: String,
            required: false,
        }
    },
    conclusion: {
        commitment: {
            type: String,
            enum: ['Yes', 'No', 'Non-committal'],
            default: 'Yes',
            required: true,
        },
        questions: {
            type: String,
            required: false,
        }
    },
    debrief: {
        type: Number,
        enum: [1, 2, 3],
        default: 1,
        required: true,
    }
});

const InterviewGrade: Model<IInterviewGrade> = mongoose.model('InterviewGrade', gradeSchema);

export default InterviewGrade;
