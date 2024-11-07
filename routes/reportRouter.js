const express = require("express");
const reportController = require("../controllers/reportControllers");
const { verifyToken, verifyRoles } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/employee/:id", verifyToken, verifyRoles(["Admin", "Manager"]), reportController.getEmployeeReport);
router.get("/department/:department", verifyToken, verifyRoles(["Admin"]), reportController.getDepartmentReport);

module.exports = router;
