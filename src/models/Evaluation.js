const mongoose = require("mongoose");

const EvaluationSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  period: String,
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
  type: String,
});

module.exports = mongoose.model("Evaluation", EvaluationSchema);
