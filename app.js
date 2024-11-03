const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRouter");
const employeeRoutes = require("./routes/employeeRouter");
const evaluationRoutes = require("./routes/evaluationRouter");
const feedbackRoutes = require("./routes/feedbackRouter");
const reportRoutes = require("./routes/reportRouter");
require("dotenv").config();


connectDB();

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/evaluations", evaluationRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/reports", reportRoutes);

module.exports = app;
