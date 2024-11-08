const express = require('express');
const { check } = require('express-validator');
const validate = require('../middleware/validate');
const authMiddleware = require('../middleware/authMiddleware');
const reportController = require('../controllers/reportControllers');

const router = express.Router();

/**
 * @swagger
 * /api/reports/employee/{id}:
 *   get:
 *     summary: Generar reporte de evaluación para un empleado
 *     tags: [Reports]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del empleado
 *     responses:
 *       200:
 *         description: Reporte de evaluación del empleado
 */
router.get('/employee/:id', [
    check('id').isMongoId().withMessage('ID de empleado inválido')
], validate, authMiddleware(["admin", "manager"]), reportController.employeeReport);

/**
 * @swagger
 * /api/reports/department/{id}:
 *   get:
 *     summary: Generar reporte por departamento
 *     tags: [Reports]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: nombre del departamento
 *     responses:
 *       200:
 *         description: Reporte de evaluaciones del departamento
 */
router.get('/department/:name', authMiddleware(['manager', 'admin']), reportController.departmentReport);

module.exports = router;
