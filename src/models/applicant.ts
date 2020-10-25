import {Schema, SchemaType, SchemaTypes} from "mongoose";

const applicantSchema = new Schema(
    {
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
            type: Number,
            enum: [0, 1],
            default: 0,
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
        }
    }
);

enum Role {
    Developer = 0,
    Designer = 1,
}

const Applicant = mongoose.model('Applicant', applicantSchema);

module.exports = Applicant