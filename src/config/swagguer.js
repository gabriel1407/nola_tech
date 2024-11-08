const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API de Evaluación 360",
      version: "1.0.0",
      description: "API para gestión de evaluaciones 360 de empleados",
    },
    servers: [{ url: "http://localhost:5000" }],
  },
  apis: [path.join(__dirname, "../routes/*.js")], // Usa una ruta absoluta
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
console.log(swaggerDocs);

module.exports = { swaggerDocs, swaggerUi };
