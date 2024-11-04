const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    departament: { type: String, required: true },
    role: {
      type: String,
      enum: ["Admin", "Manager", "Employee"],
      required: true,
    },
  },
  { timestamps: true } // Esta opción agrega los campos createdAt y updatedAt
);

module.exports = mongoose.model("User", userSchema);