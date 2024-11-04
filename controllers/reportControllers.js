const Employee = require('../models/user');
const Evaluation = require('../models/Evaluation');

exports.getEmployeeReport = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id).populate({
            path: 'evaluations',
            populate: { path: 'questions' }
        });
        if (!employee) return res.status(404).json({ message: "Employee not found" });

        res.json({
            employee: employee.name,
            position: employee.position,
            evaluations: employee.evaluations
        });
    } catch (error) {
        res.status(500).json({ message: "Error generating employee report", error });
    }
};

exports.getDepartmentReport = async (req, res) => {
    try {
        const department = req.params.department;
        const employees = await Employee.find({ department }).populate({
            path: 'evaluations',
            populate: { path: 'questions' }
        });

        const report = employees.map(employee => ({
            employee: employee.name,
            position: employee.position,
            evaluations: employee.evaluations
        }));

        res.json(report);
    } catch (error) {
        res.status(500).json({ message: "Error generating department report", error });
    }
};
