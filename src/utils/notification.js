const Evaluation = require("../models/Evaluation");

exports.notifyPendingEvaluations = async () => {
  const pendingEvaluations = await Evaluation.find({ status: "pending" });
  pendingEvaluations.forEach((evaluation) => {
    console.log(
      `Notificación: La evaluación para el empleado ${evaluation.employeeId} sigue pendiente.`
    );
  });
};
