import mongoose from 'mongoose';
import { Request, Response } from 'express';
import User, { IUser } from '../models/user';

/**
 * Creates a new user from a firstname, lastname, and Google user id
 */
export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        // Create a new user
        const googleId = res.locals.userId;
        const firstName = res.locals.firstname;
        const lastName = res.locals.lastname;
        const email = res.locals.email;

        // Verify that all fields are present
        if (firstName && lastName && googleId) {
            // Verify that the user doesn't exist already
            const usersMatchingId = await User.find({ googleId: googleId }).catch(() => []);

            if (usersMatchingId.length > 0) {
                res.status(200).send('User already exists.');
            } else {
                const newUser: IUser = new User({
                    _id: new mongoose.Types.ObjectId(),
                    googleId,
                    firstName,
                    lastName,
                    email,
                    organization: "",
                    schoolName: "",
                });
                await newUser.save();
                res.status(201).send(`New user "${firstName} ${lastName}" created.`);
            }
        } else {
            res.status(400).send('Missing parameters.');
        }
    } catch (e) {
        res.status(500).send(e.message);
    }
};
