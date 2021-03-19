import { server } from '../server';
import mongoose from 'mongoose';
import supertest from 'supertest';
import Applicant from '../../src/models/applicant';
import ScreeningGrade from '../../src/models/screening-grade';
import InterviewGrade from '../../src/models/interview-grade';

describe('ScreeningGrade + InterviewGrade Get', () => {
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

    test('GET /grade/screening/:applicantId', async () => {
        const applicant = await Applicant.create({
            userId: '101',
            firstName: 'John',
            lastName: 'Doe',
            email: 'johndoe@gmail.com',
            role: 'Developer',
            major: 'Combined CS + Stat',
            yearStanding: 1,
            level: 'Beginner',
            status: 'Pending Applications',
        });
        const screeningGrade = await ScreeningGrade.create({
            applicant: applicant._id,
            c1: 1,
            c2: 1,
            c3: 1,
            c4: 1,
            c5: 1,
            c6: 1,
            total: 6,
        });
        const applicantId = screeningGrade.applicant.toString();

        await supertest(server)
            .get('/grade/screening/' + applicantId)
            .expect(201)
            .then((response) => {
                // Check data
                expect(response.body._id).toBe(screeningGrade._id.toString());
                expect(response.body.applicant).toBe(screeningGrade.applicant.toString());
                expect(response.body.total).toBe(screeningGrade.total);
            });
    });

    test('GET /grade/interview/:applicantId', async () => {
        const applicant = await Applicant.create({
            userId: '101',
            firstName: 'John',
            lastName: 'Doe',
            email: 'johndoe@gmail.com',
            role: 'Developer',
            major: 'Combined CS + Stat',
            yearStanding: 1,
            level: 'Beginner',
            status: 'Pending Applications',
        });
        const interviewGrade = await InterviewGrade.create({
            applicant: applicant._id,
            applicantName: applicant.firstName + ' ' + applicant.lastName,
            experienceLevel: 'Independent',
            interviewer1: 'John',
            date: '9/12/2020',
            experience: {
                technical: 2,
                teamwork: 2,
            },
            depth: {
                topic: 'Client/Server',
                score: 2,
            },
            whiteboard: {
                question: 'Two Sum',
                score: 2,
            },
            conclusion: {
                commitment: 'Yes',
            },
            debrief: 2,
        });
        const applicantId = interviewGrade.applicant.toString();

        await supertest(server)
            .get('/grade/interview/' + applicantId)
            .expect(201)
            .then((response) => {
                // Check data
                expect(response.body._id).toBe(interviewGrade._id.toString());
                expect(response.body.applicant).toBe(interviewGrade.applicant.toString());
                expect(response.body.applicantName).toBe(interviewGrade.applicantName);
            });
    });
});
