const mongoose = require("mongoose");

const ResponseSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  evaluationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Evaluation",
    required: true,
  },
  answer: { type: mongoose.Schema.Types.Mixed, required: true }, // Puede ser texto o índice de opción
});

module.exports = mongoose.model("Response", ResponseSchema);
