const Response = require("../models/Response");

/**
 * Crear una respuesta para una pregunta específica dentro de una evaluación.
 */
exports.createResponse = async (req, res) => {
  try {
    const { answer, questionId, evaluationId } = req.body;
    console.log("Datos recibidos:", { answer, questionId, evaluationId }); // Verifica los datos de entrada

    const response = new Response({ answer, questionId, evaluationId });
    await response.save();
    console.log("Respuesta guardada:", response); // Verifica que el guardado sea exitoso

    res
      .status(201)
      .json({ message: "Respuesta creada exitosamente", response });
  } catch (error) {
    console.error("Error al crear la respuesta:", error.message);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Listar todas las respuestas asociadas a una evaluación.
 */
exports.listResponsesByEvaluation = async (req, res) => {
  try {
    const { evaluationId } = req.params;
    console.log(evaluationId);

    const responses = await Response.find({ evaluationId }).populate(
      "questionId",
      "text"
    );
    res.json({ evaluationId, responses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
