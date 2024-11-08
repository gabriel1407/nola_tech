const Evaluation = require("../models/Evaluation");
const Employee = require("../models/Employee");

exports.employeeReport = async (req, res) => {
  try {
    const evaluations = await Evaluation.find({
      employeeId: req.params.id,
      status: "completed",
    });
    if (!evaluations.length)
      return res
        .status(404)
        .json({ error: "No hay evaluaciones completadas para este empleado" });

    const report = evaluations.map((evaluation) => ({
      period: evaluation.period,
      type: evaluation.type,
      score: evaluation.score,
    }));

    res.json({ employeeId: req.params.id, evaluations: report });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.departmentReport = async (req, res) => {
  try {
    // Busca empleados por el nombre del departamento
    const employees = await Employee.find({ department: req.params.name });

    if (!employees.length)
      return res
        .status(404)
        .json({ error: "No hay empleados en este departamento" });

    const report = await Promise.all(
      employees.map(async (employee) => {
        const evaluations = await Evaluation.find({
          employeeId: employee._id,
          status: "completed",
        });
        return {
          employeeId: employee._id,
          name: `${employee.first_name} ${employee.last_name}`, // Nombre completo
          evaluations: evaluations.map((evaluation) => ({
            period: evaluation.period,
            type: evaluation.type,
            score: evaluation.score,
          })),
        };
      })
    );

    res.json({ departmentName: req.params.name, report });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
