const express = require("express");
const { check } = require("express-validator");
const validate = require("../middleware/validate");
const authMiddleware = require("../middleware/authMiddleware"); // Importa con el nombre correcto
const employeeController = require("../controllers/employeeControllers"); // Ajusta el nombre del controlador si es necesario

const router = express.Router();

/**
 * @swagger
 * /api/employees:
 *   get:
 *     summary: Listar todos los empleados
 *     tags: [Employees]
 *     responses:
 *       200:
 *         description: Lista de empleados
 */
router.get(
  "/",
  authMiddleware(["admin", "manager"]),
  employeeController.listEmployees
);

/**
 * @swagger
 * /api/employees/{id}:
 *   get:
 *     summary: Obtener detalles de un empleado
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del empleado
 *     responses:
 *       200:
 *         description: Detalles del empleado
 */
router.get(
  "/:id",
  [check("id").isMongoId().withMessage("ID de empleado inválido")],
  validate,
  authMiddleware("admin"),
  employeeController.getEmployee
);

/**
 * @swagger
 * /api/employees:
 *   post:
 *     summary: Crear un nuevo empleado
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               position:
 *                 type: string
 *               department:
 *                 type: string
 *     responses:
 *       201:
 *         description: Empleado creado exitosamente
 */
router.post(
  "/",
  [
    check("first_name")
      .notEmpty()
      .withMessage("El nombre es requerido")
      .trim()
      .escape(),
    check("position")
      .notEmpty()
      .withMessage("La posición es requerida")
      .trim()
      .escape(),
    check("department")
      .notEmpty()
      .withMessage("El departamento es requerido")
      .trim()
      .escape(),
  ],
  validate,
  authMiddleware(["admin", "manager"]),
  employeeController.createEmployee
);

/**
 * @swagger
 * /api/employees/{id}:
 *   put:
 *     summary: Actualizar información de un empleado
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del empleado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               position:
 *                 type: string
 *               department:
 *                 type: string
 *     responses:
 *       200:
 *         description: Empleado actualizado exitosamente
 */
router.put(
  "/:id",
  [
    check("id").isMongoId().withMessage("ID de empleado inválido"),
    check("name")
      .optional()
      .notEmpty()
      .withMessage("El nombre no puede estar vacío")
      .trim()
      .escape(),
    check("position")
      .optional()
      .notEmpty()
      .withMessage("La posición no puede estar vacía")
      .trim()
      .escape(),
    check("department")
      .optional()
      .notEmpty()
      .withMessage("El departamento no puede estar vacío")
      .trim()
      .escape(),
  ],
  validate,
  authMiddleware(["admin", "manager"]),
  employeeController.updateEmployee
);

module.exports = router;
