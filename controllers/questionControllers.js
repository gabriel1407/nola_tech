const Question = require('../models/question');

exports.createQuestion = async (req, res) => {
    try {
        const question = new Question(req.body);
        await question.save();
        res.status(201).json(question);
    } catch (error) {
        res.status(500).json({ message: "Error creating question", error });
    }
};

exports.getQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving questions", error });
    }
};

exports.getQuestionById = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) return res.status(404).json({ message: "Question not found" });
        res.json(question);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving question", error });
    }
};

exports.updateQuestion = async (req, res) => {
    try {
        const question = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!question) return res.status(404).json({ message: "Question not found" });
        res.json(question);
    } catch (error) {
        res.status(500).json({ message: "Error updating question", error });
    }
};

exports.deleteQuestion = async (req, res) => {
    try {
        const question = await Question.findByIdAndDelete(req.params.id);
        if (!question) return res.status(404).json({ message: "Question not found" });
        res.json({ message: "Question deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting question", error });
    }
};
