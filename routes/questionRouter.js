const express = require("express");
const questionController = require("../controllers/questionController");

const router = express.Router();

router.post("/", questionController.createQuestion);
router.get("/", questionController.getQuestions);
router.get("/:id", questionController.getQuestionById);
router.put("/:id", questionController.updateQuestion);
router.delete("/:id", questionController.deleteQuestion);

module.exports = router;
