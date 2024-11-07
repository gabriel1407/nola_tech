const mongoose = require("mongoose");

const evaluationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  assignedEvaluator: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Referencia a un evaluador
  period: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },
  type: { type: String, enum: ['Text', 'MultipleChoice'], required: true },
  score: Number,
}, 
{ timestamps: true });

// Comprueba si el modelo 'Evaluation' ya está definido
module.exports = mongoose.models.Evaluation || mongoose.model("Evaluation", evaluationSchema);