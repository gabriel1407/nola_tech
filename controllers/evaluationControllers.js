const Evaluation = require('../models/Evaluation');

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
