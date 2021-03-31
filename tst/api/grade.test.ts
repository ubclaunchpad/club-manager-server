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
            status: 'Pending Applications',
        });
        const screeningGrade = await ScreeningGrade.create({
            applicant: applicant._id,
            c1: 1,
            c2: 1,
            c3: 1,
            total: 3,
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

    test('POST /grade/screening/:applicantId', async () => {
        const applicant = await Applicant.create({
            userId: '101',
            firstName: 'John',
            lastName: 'Doe',
            email: 'johndoe@gmail.com',
            role: 'Developer',
            major: 'Combined CS + Stat',
            yearStanding: 1,
            status: 'Pending Applications',
        });

        const screenBody = {
            c1: 0,
            c2: 1,
            c3: 2,
            level: 'Independent',
        };

        await supertest(server)
            .post(`/grade/screening/${applicant._id}`)
            .send(screenBody)
            .expect(201)
            .then((response) => {
                expect(response.body.applicant).toBe(applicant._id.toString());
                expect(response.body.total).toBe(3);
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
            level: 'Independent',
            interviewer1: 'Connor',
            interviewer2: 'Connor',
            intro: 'This is a test',
            experienceTechnical: 1,
            experienceTeamwork: 1,
            depthTopic: 'Client/Server',
            depthScore: 1,
            whiteboardQuestion: 'Two Sum',
            whiteboardScore: 2,
            whiteboardComments: 'I have none',
            conclusionTimeCommitment: 'Yes',
            conclusionQuestions: 'Yes',
            debrief: 2,
            total: 7,
        });
        const applicantId = interviewGrade.applicant.toString();

        await supertest(server)
            .get('/grade/interview/' + applicantId)
            .expect(201)
            .then((response) => {
                // Check data
                expect(response.body._id).toBe(interviewGrade._id.toString());
                expect(response.body.applicant).toBe(interviewGrade.applicant.toString());
            });
    });
});
