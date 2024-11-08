const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');

describe('Response Controller', () => {
    let token;
    let evaluationId = '60f7a5c3c5f54b2cf6c8b64f'; // Reemplaza con un ID de evaluación válido
    let questionId = '60f7a5c3c5f54b2cf6c8b650'; // Reemplaza con un ID de pregunta válido

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

        // Autenticar y obtener un token
        const res = await request(app).post('/api/auth/login').send({
            username: 'empleado',
            password: 'empleadopassword'
        });
        token = res.body.token;
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should create a new response', async () => {
        const res = await request(app)
            .post('/api/responses')
            .set('Authorization', `Bearer ${token}`)
            .send({
                questionId: questionId,
                evaluationId: evaluationId,
                answer: 'Excellent'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('message', 'Respuesta creada exitosamente');
    });

    it('should list responses by evaluation ID', async () => {
        const res = await request(app)
            .get(`/api/responses/evaluation/${evaluationId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('evaluationId', evaluationId);
        expect(Array.isArray(res.body.responses)).toBeTruthy();
    });
});
