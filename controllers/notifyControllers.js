const Notification = require("../models/Notification");

exports.notifyEvaluator = async (evaluatorId, evaluationId) => {
  try {
    const notification = new Notification({
      evaluatorId,
      evaluationId,
      message: "Tienes una evaluación pendiente",
      status: "Pending",
    });
    await notification.save();
    console.log("Notificación creada con éxito");
  } catch (error) {
    console.error("Error al crear la notificación:", error);
  }
};
