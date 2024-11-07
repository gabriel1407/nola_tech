const express = require("express");
const questionController = require("../controllers/questionControllers");
const { verifyToken, verifyRoles } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", verifyToken, verifyRoles(["Admin", "Manager"]),questionController.createQuestion);
router.get("/", verifyToken, verifyRoles(["Admin", "Manager"]),questionController.getQuestions);
router.put("/:id", verifyToken, verifyRoles(["Admin", "Manager"]),questionController.updateQuestion);

module.exports = router;
