const express = require('express');
const { check } = require('express-validator');
const validate = require('../middleware/validate');
const authMiddleware = require("../middleware/authMiddleware");
const questionController = require('../controllers/questionControllers');

const router = express.Router();

/**
 * @swagger
 * /api/questions:
 *   get:
 *     summary: Listar todas las preguntas
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de preguntas
 */
router.get("/", authMiddleware(["admin", "manager"]), questionController.listQuestions);

/**
 * @swagger
 * /api/questions/{id}:
 *   put:
 *     summary: Actualizar una pregunta
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la pregunta a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [text, multiple_choice]
 *               options:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Pregunta actualizada exitosamente
 */
router.put("/:id", [
    check('id').isMongoId().withMessage('ID de pregunta inválido'),
    check('text').optional().notEmpty().withMessage('El texto de la pregunta no puede estar vacío').trim().escape(),
    check('type').optional().isIn(['text', 'multiple_choice']).withMessage('Tipo de pregunta inválido'),
    check('options').optional().isArray().withMessage('Las opciones deben ser un arreglo')
], validate, authMiddleware(["admin", "manager"]), questionController.updateQuestion);

/**
 * @swagger
 * /api/questions:
 *   post:
 *     summary: Crear nueva pregunta
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [text, multiple_choice]
 *               options:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Pregunta creada exitosamente
 */
router.post('/', [
    check('text').notEmpty().withMessage('El texto de la pregunta es requerido').trim().escape(),
    check('type').isIn(['text', 'multiple_choice']).withMessage('Tipo de pregunta inválido'),
    check('options').optional().isArray().withMessage('Las opciones deben ser un arreglo')
], validate, authMiddleware(["admin", "manager"]), questionController.createQuestion);

module.exports = router;
