const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRouter");
const employeeRoutes = require("./routes/employeeRouter");
const evaluationRoutes = require("./routes/evaluationRouter");
const questionRoutes = require("./routes/questionRouter");
const reportRoutes = require("./routes/reportRouter");
require("dotenv").config();
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Límite de 100 solicitudes por IP
});



const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API de sistema de evaluaciones Evaluaciones",
      version: "1.0.0",
      description: "Documentación de la API de Evaluaciones",
    },
    servers: [{ url: "http://localhost:5000" }],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);


connectDB();

const app = express();
app.use(express.json());
app.use(limiter);
app.use(mongoSanitize());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Ha ocurrido un error interno del servidor" });
});


app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/evaluations", evaluationRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/reports", reportRoutes);

module.exports = app;
