const express = require("express");
const employeeController = require("../controllers/employeeControllers");
const { verifyToken, verifyRoles } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Employees
 *   description: Endpoints para la gestión de empleados
 */

/**
 * @swagger
 * /api/employees:
 *   post:
 *     summary: Crear un nuevo empleado
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nombre de usuario del empleado
 *                 example: john_doe
 *               first_name:
 *                 type: string
 *                 description: Nombre del empleado
 *                 example: John
 *               last_name:
 *                 type: string
 *                 description: Apellido del empleado
 *                 example: Doe
 *               email:
 *                 type: string
 *                 description: Correo electrónico del empleado
 *                 example: johndoe@example.com
 *               phone:
 *                 type: string
 *                 description: Teléfono del empleado
 *                 example: 1234567890
 *               age:
 *                 type: integer
 *                 description: Edad del empleado
 *                 example: 30
 *               gender:
 *                 type: string
 *                 description: Género del empleado
 *                 example: Masculino
 *               departament:
 *                 type: string
 *                 description: Departamento del empleado
 *                 example: Sistemas
 *               position:
 *                 type: string
 *                 description: Cargo del empleado
 *                 example: Desarrollador
 *               role:
 *                 type: string
 *                 enum: ["Admin", "Manager", "Employee"]
 *                 description: Rol del empleado
 *                 example: Employee
 *     responses:
 *       201:
 *         description: Empleado creado exitosamente
 *       401:
 *         description: No autorizado. Token no proporcionado
 *       500:
 *         description: Error en la creación del empleado
 */

router.post("/", verifyToken, verifyRoles(["Admin"]), employeeController.createEmployee);

/**
 * @swagger
 * /api/employees:
 *   get:
 *     summary: Obtener lista de empleados
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de empleados obtenida exitosamente
 *       401:
 *         description: No autorizado. Token no proporcionado
 *       500:
 *         description: Error al obtener los empleados
 */

router.get("/", verifyToken, verifyRoles(["Admin", "Manager"]), employeeController.getEmployees);

/**
 * @swagger
 * /api/employees/{id}:
 *   get:
 *     summary: Obtener detalles de un empleado
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del empleado
 *     responses:
 *       200:
 *         description: Detalles del empleado obtenidos exitosamente
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Empleado no encontrado
 *       500:
 *         description: Error al obtener el empleado
 */

router.get("/:id", verifyToken, verifyRoles(["Admin", "Manager"]), employeeController.getEmployeeById);

/**
 * @swagger
 * /api/employees/{id}:
 *   put:
 *     summary: Actualizar información de un empleado
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del empleado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 description: Nombre del empleado
 *                 example: John
 *               last_name:
 *                 type: string
 *                 description: Apellido del empleado
 *                 example: Doe
 *               email:
 *                 type: string
 *                 description: Correo electrónico del empleado
 *                 example: johndoe@example.com
 *               phone:
 *                 type: string
 *                 description: Teléfono del empleado
 *                 example: 1234567890
 *               age:
 *                 type: integer
 *                 description: Edad del empleado
 *                 example: 30
 *               gender:
 *                 type: string
 *                 description: Género del empleado
 *                 example: Masculino
 *               departament:
 *                 type: string
 *                 description: Departamento del empleado
 *                 example: Sistemas
 *               position:
 *                 type: string
 *                 description: Cargo del empleado
 *                 example: Desarrollador
 *               role:
 *                 type: string
 *                 enum: ["Admin", "Manager", "Employee"]
 *                 description: Rol del empleado
 *                 example: Employee
 *     responses:
 *       200:
 *         description: Empleado actualizado exitosamente
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Empleado no encontrado
 *       500:
 *         description: Error al actualizar el empleado
 */

router.put("/:id", verifyToken, verifyRoles(["Admin"]), employeeController.updateEmployee);

module.exports = router;
