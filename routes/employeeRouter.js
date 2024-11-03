const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeControllers");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, employeeController.getEmployees);

module.exports = router;
