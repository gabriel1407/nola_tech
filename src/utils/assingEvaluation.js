const Employee = require("../models/Employee");
const User = require("../models/User");

exports.assignEvaluators = async (evaluationId) => {
  // Ejemplo de lógica de asignación de evaluadores
  const employees = await Employee.find();
  const managers = await User.find({ role: ["manager", "admin"] });

  employees.forEach(async (employee) => {
    const evaluator = managers[Math.floor(Math.random() * managers.length)];
    // Aquí podrías registrar la asignación en la base de datos
    console.log(
      `Evaluador ${evaluator.username} asignado al empleado ${employee.first_name} ${employee.last_name} para la evaluación ${evaluationId}`
    );
  });
};
