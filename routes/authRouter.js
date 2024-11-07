const express = require("express");
const router = express.Router();
const authController = require("../controllers/authControllers");
const { body } = require("express-validator");

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Endpoints para autenticación de usuarios
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registro de un nuevo usuario
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nombre de usuario único
 *                 example: gabriel
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario, mínimo 6 caracteres
 *                 example: 28076448
 *               role:
 *                 type: string
 *                 enum: ["Admin", "Manager", "Employee"]
 *                 description: Rol del usuario en el sistema
 *                 example: Admin
 *               position:
 *                 type: string
 *                 description: Cargo profesional del usuario
 *                 example: Lider de proyecto
 *               departament:
 *                 type: string
 *                 description: Departamento al que pertenece el usuario
 *                 example: Sistema
 *               gender:
 *                 type: string
 *                 description: Género del usuario
 *                 example: Masculino
 *               age:
 *                 type: integer
 *                 description: Edad del usuario
 *                 example: 23
 *               first_name:
 *                 type: string
 *                 description: Nombre del usuario
 *                 example: Gabriel
 *               last_name:
 *                 type: string
 *                 description: Apellido del usuario
 *                 example: Carvajal
 *               phone:
 *                 type: string
 *                 description: Número de teléfono del usuario
 *                 example: 04128281479
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *                 example: carvajalgabriel1407@gmail.com
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario registrado exitosamente
 *                 user:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                       example: gabriel
 *                     email:
 *                       type: string
 *                       example: carvajalgabriel1407@gmail.com
 *                     role:
 *                       type: string
 *                       example: Admin
 *       500:
 *         description: Error en el registro
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error en el registro
 *                 error:
 *                   type: object
 */

router.post("/register", [
    body("username").isLength({ min: 3 }).withMessage("El nombre de usuario debe tener al menos 3 caracteres"),
    body("password").isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
    body("email").isEmail().withMessage("Debe ser un correo electrónico válido"),
    body("first_name").notEmpty().withMessage("El nombre es obligatorio"),
    body("last_name").notEmpty().withMessage("El apellido es obligatorio"),
    body("phone").notEmpty().withMessage("El teléfono es obligatorio"),
    body("age").isInt({ min: 1 }).withMessage("La edad debe ser un número válido"),
    body("gender").notEmpty().withMessage("El género es obligatorio"),
    body("departament").notEmpty().withMessage("El departamento es obligatorio"),
    body("position").notEmpty().withMessage("La posición es obligatoria")
], authController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión y obtener JWT
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nombre de usuario
 *                 example: gabriel
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *                 example: 28076448
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso, devuelve JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Credenciales incorrectas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Credenciales incorrectas
 */

router.post("/login", authController.login);

module.exports = router;
