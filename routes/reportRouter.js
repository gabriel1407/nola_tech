const express = require("express");
const reportController = require("../controllers/reportController");

const router = express.Router();

router.get("/employee/:id", reportController.getEmployeeReport);
router.get("/department/:department", reportController.getDepartmentReport);

module.exports = router;
