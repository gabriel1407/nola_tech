const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
    evaluation: { type: mongoose.Schema.Types.ObjectId, ref: 'Evaluation', required: true },
    question: { type: String, required: true },
    answer: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Response', responseSchema);
