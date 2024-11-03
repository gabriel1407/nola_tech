const express = require("express");
const router = express.Router();
const evaluationController = require("../controllers/evaluationControllers");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, evaluationController.createEvaluation);
router.get("/:id", authMiddleware, evaluationController.getEvaluationById);
router.put("/:id", authMiddleware, evaluationController.updateEvaluation);
router.get(
  "/employee/:id",
  authMiddleware,
  evaluationController.getEvaluationsByEmployee
);

module.exports = router;
