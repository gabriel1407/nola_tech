const Evaluation = require("../models/Evaluation");
const Employee = require("../models/Employee");
const { calculateScore } = require("../utils/calculateScore");
const { assignEvaluators } = require("../utils/assingEvaluation");
const { notifyPendingEvaluations } = require("../utils/notification");

exports.createEvaluation = async (req, res) => {
  try {
    const evaluation = new Evaluation(req.body);
    await evaluation.save();
    await assignEvaluators(evaluation._id); // Asigna evaluadores al crear la evaluación
    res.status(201).json(evaluation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.listEvaluations = async (req, res) => {
  try {
    const evaluations = await Evaluation.find();
    res.json(evaluations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEvaluation = async (req, res) => {
  try {
    const evaluation = await Evaluation.findById(req.params.id);
    if (!evaluation)
      return res.status(404).json({ error: "Evaluación no encontrada" });
    res.json(evaluation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateEvaluation = async (req, res) => {
  try {
    const evaluation = await Evaluation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!evaluation)
      return res.status(404).json({ error: "Evaluación no encontrada" });
    res.json(evaluation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.submitEvaluation = async (req, res) => {
  try {
    const evaluation = await Evaluation.findById(req.params.id);
    if (!evaluation)
      return res.status(404).json({ error: "Evaluación no encontrada" });

    const score = calculateScore(req.body.answers); // Calcula el puntaje basado en respuestas
    evaluation.score = score;
    evaluation.status = "completed";
    await evaluation.save();

    notifyPendingEvaluations(); // Enviar notificación de evaluaciones pendientes
    res.json({ message: "Evaluación completada", score });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
