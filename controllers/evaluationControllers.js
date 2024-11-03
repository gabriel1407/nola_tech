const Evaluation = require("../models/evaluation");

exports.createEvaluation = async (req, res) => {
  try {
    const evaluation = new Evaluation(req.body);
    await evaluation.save();
    res.status(201).json(evaluation);
  } catch (error) {
    res.status(500).json({ message: "Error al crear evaluación", error });
  }
};

exports.getEvaluationById = async (req, res) => {
  try {
    const evaluation = await Evaluation.findById(req.params.id);
    if (!evaluation)
      return res.status(404).json({ message: "Evaluación no encontrada" });
    res.json(evaluation);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener evaluación", error });
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
      return res.status(404).json({ message: "Evaluación no encontrada" });
    res.json(evaluation);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar evaluación", error });
  }
};

exports.getEvaluationsByEmployee = async (req, res) => {
  try {
    const evaluations = await Evaluation.find({ employeeId: req.params.id });
    res.json(evaluations);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener evaluaciones del empleado", error });
  }
};
