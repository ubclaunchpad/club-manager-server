import { Request, Response, NextFunction } from 'express';
import { googleAuth } from './google-auth';

// Function called by middleware to verify that the google token is valid
export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const bearerHeader = req.headers['authorization'];

    if (bearerHeader) {
        // Isolate the token from the header
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];

        // Verify the token
        const credentials = await googleAuth(bearerToken);
        if (credentials) {
            // Store credentials
            res.locals.userId = credentials.userId;
            res.locals.email = credentials.email;
            res.locals.firstname = credentials.given_name;
            res.locals.lastname = credentials.family_name;

            // Grant access to endpoint
            next();
        } else {
            // Bad user
            res.status(403).send('Bad Token.');
        }
    } else {
        // No token
        res.status(401).send('Auth token missing.');
    }
};
