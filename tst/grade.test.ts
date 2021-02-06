import { server } from './server';
import mongoose from 'mongoose';
import supertest from 'supertest';
import Applicant from '../src/models/applicant';
import ScreeningGrade from '../src/models/screening-grade';
import InterviewGrade from '../src/models/interview-grade';

describe("Applicant's ScreeningGrade + InterviewGrade Get", () => {
    beforeEach((done) => {
        // try switching to mongodb://127.0.0.1:27017/JestDB if not working on a local instace
        mongoose.connect('mongodb://mongodb:27017/JestDB', { useNewUrlParser: true, useUnifiedTopology: true }, () =>
            done(),
        );
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
            status: 'Pending',
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

    test('GET /grade/screening/:applicantId', async () => {
        const applicant = await Applicant.create({
            firstName: 'John',
            lastName: 'Doe',
            email: 'johndoe@gmail.com',
            role: 'Developer',
            major: 'Combined CS + Stat',
            yearStanding: 1,
            level: 'Beginner',
            status: 'Pending',
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
            firstName: 'John',
            lastName: 'Doe',
            email: 'johndoe@gmail.com',
            role: 'Developer',
            major: 'Combined CS + Stat',
            yearStanding: 1,
            level: 'Beginner',
            status: 'Pending',
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
