const express = require('express');
const { check } = require('express-validator');
const validate = require('../middleware/validate'); // Middleware de validación
const authMiddleware = require('../middleware/authMiddleware'); // Middleware de autenticación
const responseController = require('../controllers/responseControllers');

const router = express.Router();

/**
 * @swagger
 * /api/responses:
 *   post:
 *     summary: Crear una respuesta para una pregunta en una evaluación
 *     tags: [Responses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               questionId:
 *                 type: string
 *               evaluationId:
 *                 type: string
 *               answer:
 *                 type: string
 *             required:
 *               - questionId
 *               - evaluationId
 *               - answer
 *     responses:
 *       201:
 *         description: Respuesta creada exitosamente
 */
router.post(
  "/",
  [
    check('answer').notEmpty().withMessage('La respuesta es requerida').trim().escape(),
    check('questionId').notEmpty().isMongoId().withMessage('ID de la pregunta inválido'),
    check('evaluationId').notEmpty().isMongoId().withMessage('ID de la evaluación inválido')
  ],
  validate,
  authMiddleware(["empleado", "manager", "admin"]),
  responseController.createResponse
);

/**
 * @swagger
 * /api/responses/evaluation/{evaluationId}:
 *   get:
 *     summary: Listar todas las respuestas de una evaluación
 *     tags: [Responses]
 *     parameters:
 *       - in: path
 *         name: evaluationId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la evaluación
 *     responses:
 *       200:
 *         description: Lista de respuestas para la evaluación especificada
 */
router.get(
  '/evaluation/:evaluationId', 
  [
    check('evaluationId').isMongoId().withMessage('ID de evaluación inválido')
  ],
  validate,
  authMiddleware(["empleado", "manager", "admin"]),
  responseController.listResponsesByEvaluation
);

module.exports = router;
