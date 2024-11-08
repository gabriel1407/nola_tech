const express = require('express');
const { check } = require('express-validator');
const validate = require('../middleware/validate');
const authMiddleware = require("../middleware/authMiddleware");
const evaluationController = require('../controllers/evaluationControllers');

const router = express.Router();

/**
 * @swagger
 * /api/evaluations:
 *   post:
 *     summary: Crear nueva evaluación
 *     tags: [Evaluations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employeeId:
 *                 type: string
 *               period:
 *                 type: string
 *               type:
 *                 type: string
 *     responses:
 *       201:
 *         description: Evaluación creada exitosamente
 */
router.post('/', [
    check('employeeId').notEmpty().withMessage('El ID del empleado es requerido').isMongoId(),
    check('period').notEmpty().withMessage('El período es requerido').trim().escape(),
    check('type').notEmpty().withMessage('El tipo es requerido').trim().escape()
], validate, authMiddleware(["admin", "manager"]), evaluationController.createEvaluation);

/**
 * @swagger
 * /api/evaluations:
 *   get:
 *     summary: Listar todas las evaluaciones
 *     tags: [Evaluations]
 *     responses:
 *       200:
 *         description: Lista de evaluaciones
 */
router.get('/', authMiddleware(["admin", "manager"]), evaluationController.listEvaluations);

/**
 * @swagger
 * /api/evaluations/{id}:
 *   get:
 *     summary: Obtener detalles de una evaluación
 *     tags: [Evaluations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la evaluación
 *     responses:
 *       200:
 *         description: Detalles de la evaluación
 */
router.get('/:id', [
    check('id').isMongoId().withMessage('ID de evaluación inválido')
], validate, authMiddleware(["admin", "manager"]), evaluationController.getEvaluation);

/**
 * @swagger
 * /api/evaluations/{id}:
 *   put:
 *     summary: Actualizar evaluación
 *     tags: [Evaluations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la evaluación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               period:
 *                 type: string
 *               type:
 *                 type: string
 *     responses:
 *       200:
 *         description: Evaluación actualizada exitosamente
 */
router.put('/:id', [
    check('id').isMongoId().withMessage('ID de evaluación inválido'),
    check('period').optional().notEmpty().withMessage('El período no puede estar vacío').trim().escape(),
    check('type').optional().notEmpty().withMessage('El tipo no puede estar vacío').trim().escape(),
], validate, authMiddleware(["admin", "manager"]), evaluationController.updateEvaluation);

/**
 * @swagger
 * /api/evaluations/{id}/submit:
 *   post:
 *     summary: Enviar una evaluación completada
 *     tags: [Evaluations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la evaluación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               answers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     questionId:
 *                       type: string
 *                     score:
 *                       type: integer
 *     responses:
 *       200:
 *         description: Evaluación completada exitosamente
 */
router.post('/:id/submit', [
    check('id').isMongoId().withMessage('ID de evaluación inválido'),
    check('answers').isArray({ min: 1 }).withMessage('Las respuestas son requeridas y deben estar en un arreglo')
], validate, authMiddleware('empleado'), evaluationController.submitEvaluation);

module.exports = router;
