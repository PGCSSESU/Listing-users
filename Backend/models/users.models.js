const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    Avatar: { type: String },
    first_name: { type: String, index: true },
    last_name: { type: String, index: true },
    email: { type: String, unique: true },
    gender: { type: String, enum: ["Male", "Female"] },
    Role: { type: String, index: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
