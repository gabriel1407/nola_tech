const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    text: { type: String, required: true },
    type: { type: String, enum: ['Text', 'MultipleChoice'], required: true },
    options: [String], // Opciones para preguntas de selección múltiple
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);
