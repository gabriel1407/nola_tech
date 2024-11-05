const mongoose = require("mongoose");

const evaluationSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  period: { type: String, required: true },
  questions: {type: String, required: true},
  status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },
  type: { type: String, enum: ['Text', 'MultipleChoice'], required: true },
}, 
{ timestamps: true });

module.exports = mongoose.model('Evaluation', evaluationSchema);