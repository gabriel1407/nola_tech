const express = require("express");
const evaluationController = require("../controllers/evaluationControllers");
const { verifyToken, verifyRoles } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", verifyToken, verifyRoles(["Admin", "Manager"]), evaluationController.createEvaluation);
router.get("/", verifyToken, verifyRoles(["Admin", "Manager", "Employee"]), evaluationController.getEvaluations);
router.get("/:id", verifyToken, verifyRoles(["Admin", "Manager", "Employee"]), evaluationController.getEvaluationById);
router.put("/:id", verifyToken, verifyRoles(["Admin", "Manager"]), evaluationController.updateEvaluation);
router.put("/:id/submit", verifyToken, verifyRoles(["Employee"]), evaluationController.submitEvaluation);

module.exports = router;
