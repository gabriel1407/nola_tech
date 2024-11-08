const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  type: { type: String, enum: ["text", "multiple_choice"], default: "text" },
  options: [String], // Opciones solo aplican para preguntas de opción múltiple
});

module.exports = mongoose.model("Question", QuestionSchema);
