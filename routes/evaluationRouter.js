const express = require("express");
const evaluationController = require("../controllers/evaluationController");

const router = express.Router();

router.post("/", evaluationController.createEvaluation);
router.get("/", evaluationController.getEvaluations);
router.get("/:id", evaluationController.getEvaluationById);
router.put("/:id", evaluationController.updateEvaluation);
router.put("/:id/submit", evaluationController.submitEvaluation);

module.exports = router;
