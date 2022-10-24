const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userName: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
  },
  { versionKey: false }
);

const User = mongoose.model("User", userSchema);

module.exports = {User} ;
