const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');

describe('Report Controller', () => {
    let token;
    let employeeId = '60f7a5c3c5f54b2cf6c8b64e'; // Reemplaza con un ID de empleado válido
    let departmentId = 'Engineering'; // Reemplaza con un ID de departamento válido

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

        // Autenticar y obtener un token
        const res = await request(app).post('/api/auth/login').send({
            username: 'manager',
            password: 'managerpassword'
        });
        token = res.body.token;
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should generate a report for a specific employee', async () => {
        const res = await request(app)
            .get(`/api/reports/employee/${employeeId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('employeeId', employeeId);
        expect(Array.isArray(res.body.evaluations)).toBeTruthy();
    });

    it('should generate a report for a specific department', async () => {
        const res = await request(app)
            .get(`/api/reports/department/${departmentId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('departmentId', departmentId);
        expect(Array.isArray(res.body.report)).toBeTruthy();
    });
});
