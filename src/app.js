const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRouter");
const employeeRoutes = require("./routes/employeeRouter");
const evaluationRoutes = require("./routes/evaluationRouter");
const questionRoutes = require("./routes/questionRouter");
const responseRoutes = require("./routes/responseRouter");
const reportRoutes = require("./routes/reportRouter");
const { swaggerDocs, swaggerUi } = require("./config/swagguer");
const limiter = require("./middleware/rateLimit");
require("dotenv").config();
const app = express();
connectDB();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/evaluations", evaluationRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/responses", responseRoutes);
app.use("/api/reports", reportRoutes);

// SWAGUERR
app.use("/api-docs/", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// lIMITACIÒN DE IP
app.use(limiter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Ocurrió un error en el servidor" });
});



module.exports = app;
