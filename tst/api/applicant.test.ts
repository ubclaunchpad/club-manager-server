import { server } from '../server';
import mongoose from 'mongoose';
import supertest from 'supertest';
import Applicant from '../../src/models/applicant';

describe('Applicant Get', () => {
    const ENDPOINT = process.env.MONGO_URL;

    beforeEach((done) => {
        mongoose.connect(ENDPOINT, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
        mongoose.connection.on('connected', () => done());
    });

    afterEach((done) => {
        mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(() => done());
        });
    });

    test('GET /applicant', async () => {
        const applicant = await Applicant.create({
            firstName: 'John',
            lastName: 'Doe',
            email: 'johndoe@gmail.com',
            role: 'Developer',
            major: 'Combined CS + Stat',
            yearStanding: 1,
            level: 'Beginner',
            status: 'Pending Applications',
        });

        await supertest(server)
            .get('/applicant')
            .expect(201)
            .then((response) => {
                // Check type and length
                expect(Array.isArray(response.body)).toBeTruthy();
                expect(response.body.length).toEqual(1);

                // Check data
                expect(response.body[0]._id).toBe(applicant._id.toString());
                expect(response.body[0].firstName).toBe(applicant.firstName);
                expect(response.body[0].lastName).toBe(applicant.lastName);
            });
    });
});
