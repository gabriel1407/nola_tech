const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    evaluatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    evaluationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Evaluation",
      required: true,
    },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "Read", "Completed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Notification ||
  mongoose.model("Notification", notificationSchema);
