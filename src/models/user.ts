import mongoose from 'mongoose';
import { Document, Model, Schema } from 'mongoose';

export interface IUser extends Document {
    _id: Schema.Types.ObjectId;
    googleId: string; // ID attached to Google Account
    firstName: string;
    lastName: string;
    email: string;
}

const userSchema = new Schema({
    _id: Schema.Types.ObjectId,
    googleId: {
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
        trim: true,
        required: true,
    },
});

const User: Model<IUser> = mongoose.model('User', userSchema);

export default User;
