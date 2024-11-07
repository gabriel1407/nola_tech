const Evaluation = require('../models/evaluation');
const { notifyEvaluator } = require("../controllers/notifyControllers");

exports.createEvaluation = async (req, res) => {
    try {
        const evaluation = new Evaluation(req.body);
        await evaluation.save();
        res.status(201).json(evaluation);
    } catch (error) {
        res.status(500).json({ message: "Error creating evaluation", error });
    }
};

exports.getEvaluations = async (req, res) => {
    try {
        const evaluations = await Evaluation.find().populate('employee').populate('questions');
        res.json(evaluations);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving evaluations", error });
    }
};

exports.getEvaluationById = async (req, res) => {
    try {
        const evaluation = await Evaluation.findById(req.params.id).populate('employee').populate('questions');
        if (!evaluation) return res.status(404).json({ message: "Evaluation not found" });
        res.json(evaluation);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving evaluation", error });
    }
};

exports.updateEvaluation = async (req, res) => {
    try {
        const evaluation = await Evaluation.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!evaluation) return res.status(404).json({ message: "Evaluation not found" });
        res.json(evaluation);
    } catch (error) {
        res.status(500).json({ message: "Error updating evaluation", error });
    }
};

exports.submitEvaluation = async (req, res) => {
    try {
        const evaluation = await Evaluation.findById(req.params.id);
        if (!evaluation) return res.status(404).json({ message: "Evaluation not found" });
        
        evaluation.status = 'Completed';
        await evaluation.save();
        
        res.json({ message: "Evaluation submitted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error submitting evaluation", error });
    }
};

exports.calculateScore = (evaluationData) => {
  const { criteria } = evaluationData;

  const totalScore = criteria.reduce(
    (sum, item) => sum + item.score * item.weight,
    0
  );
  return totalScore;
};

exports.assignEvaluator = async (employeeId) => {
  const evaluators = await User.find({ role: "Manager" });
  const randomEvaluator =
    evaluators[Math.floor(Math.random() * evaluators.length)];
  return randomEvaluator._id;
};



exports.assignEvaluation = async (req, res) => {
    try {
        const { employeeId, evaluatorId, name, period, type } = req.body;
        
        // Crear evaluación
        const evaluation = new Evaluation({
            name,
            employeeId,
            assignedEvaluator: evaluatorId,
            period,
            type,
            status: "Pending",
        });
        
        await evaluation.save();

        // Crear notificación para el evaluador
        await notifyEvaluator(evaluatorId, evaluation._id);

        res.status(201).json({ message: "Evaluación asignada y notificación creada", evaluation });
    } catch (error) {
        res.status(500).json({ message: "Error al asignar evaluación", error });
    }
};