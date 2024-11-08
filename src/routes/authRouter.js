const express = require('express');
const { check } = require('express-validator');
const validate = require('../middleware/validate');
const authController = require('../controllers/authControllers');

const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registro de nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [admin, manager, empleado]
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 */
router.post('/register', [
    check('username').notEmpty().withMessage('El nombre de usuario es requerido').trim().escape(),
    check('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    check('role').isIn(['admin', 'manager', 'empleado']).withMessage('Rol inválido')
], validate, authController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Inicio de sesión de usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 */
router.post('/login', [
    check('username').notEmpty().withMessage('El nombre de usuario es requerido').trim().escape(),
    check('password').notEmpty().withMessage('La contraseña es requerida')
], validate, authController.login);

module.exports = router;
