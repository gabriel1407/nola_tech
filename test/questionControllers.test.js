const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');

describe('Question Controller', () => {
    let token;
    let questionId;

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

        // Autenticar y obtener un token
        const res = await request(app).post('/api/auth/login').send({
            username: 'admin',
            password: 'adminpassword'
        });
        token = res.body.token;
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should create a new question', async () => {
        const res = await request(app)
            .post('/api/questions')
            .set('Authorization', `Bearer ${token}`)
            .send({
                text: 'How would you rate your experience?',
                type: 'text'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
        questionId = res.body._id;
    });

    it('should update the question', async () => {
        const res = await request(app)
            .put(`/api/questions/${questionId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                text: 'How would you rate your recent project experience?',
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('text', 'How would you rate your recent project experience?');
    });

    it('should list all questions', async () => {
        const res = await request(app)
            .get('/api/questions')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });
});
